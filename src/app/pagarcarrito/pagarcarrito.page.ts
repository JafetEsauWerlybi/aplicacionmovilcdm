import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApplePayEventsEnum, GooglePayEventsEnum, PaymentFlowEventsEnum, PaymentSheetEventsEnum, Stripe } from '@capacitor-community/stripe';
import { first, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarritoService } from '../services/carrito.service';
import { PerfilService } from '../services/perfil.service';
import { UserData } from '../interface/userData';
import { Carrito } from '../interface/Carrito';
import { Direccion } from '../interface/pedidos';
import { PedidosService } from '../services/pedidos.service';
import { NavController ,ModalController} from '@ionic/angular';
import { FeedbackComponent } from '../feedback/feedback.component';

@Component({
  selector: 'app-pagarcarrito',
  templateUrl: './pagarcarrito.page.html',
  styleUrls: ['./pagarcarrito.page.scss'],
})
export class PagarcarritoPage implements OnInit {
  userData!: UserData;
  carrito: Carrito[] = [];
  loading: boolean = true;
  total: number = 0;
  data: any = {};
  direcciones: Direccion[] = [];

  constructor(
    private http: HttpClient,
    private carritoService: CarritoService,
    private perfilService: PerfilService,
    private pedidosS : PedidosService,
    private nav: NavController,
    private modalController: ModalController 
  ) {
    Stripe.initialize({
      publishableKey: environment.stripe.publishableKey,
    });
  }

  async ngOnInit() {
    await this.traerDatosUsuario();
    await this.cargarCarrito();
    this.data = {
      name: this.userData.Nombre,
      email: this.userData.Correo,
      amount: this.total *100,
      currency: 'mxn',
    };
    console.log('Datos de pago inicializados:', this.data);
  }

  async ionViewWillEnter() {
    await this.traerDatosUsuario();
    await this.cargarCarrito();
    this.data = {
      name: this.userData.Nombre,
      email: this.userData.Correo,
      amount: this.total * 100,
      currency: 'mxn',
    };
    console.log('Datos de pago inicializados:', this.data);
  }

  goToCarrito(){
    this.nav.navigateForward('home/tabs/tab3')
  }

  async openSurveyModal() {
    const modal = await this.modalController.create({
      component: FeedbackComponent, // Componente de encuesta
      cssClass: 'my-custom-class', // Clase personalizada si tienes alguna
      componentProps: { /* Pasa aquí los datos necesarios para la encuesta, si es necesario */ }
    });
    return await modal.present();

  }
  
  async traerDatosUsuario() {
    try {
      this.userData = await this.perfilService.obtenerDatosUsuario();
      console.log('Datos de usuario obtenidos:', this.userData);
      this.perfilService.traerDirecciones(this.userData.idUsuario).subscribe({
        next: (direcciones) => {
          if (direcciones && direcciones.length > 0) {
            this.direcciones = direcciones.slice(-1); 
            console.log('Direcciones obtenidas:', this.direcciones);
          } else {
            console.warn('No hay direcciones disponibles para mostrar.');
            this.direcciones = [];
          }
        },
        error: (error) => {
          console.error('Error al obtener direcciones:', error);
          setTimeout(() => this.traerDatosUsuario(), 2000); // Reintentar después de 2 segundos si falla
        },
      });
    } catch (error) {
      console.error('Error al obtener datos de usuario:', error);
      this.loading = false;
    }
  }

  async verificarEncuesta(){
    const exito= await this.perfilService.verificarEncuesta(this.userData.idUsuario);
    console.log("valor si ya contesto encuesta: ", exito);
    if (!exito) {
      this.openSurveyModal();
    }else{
      this.nav.navigateForward('/home/tabs/tab2')
    }

  }

  async cargarCarrito() {
    if (!this.userData || !this.userData.idUsuario) {
      console.error('Error: idUsuario no está disponible');
      this.loading = false;
      return;
    }

    try {
      const data = await lastValueFrom(this.carritoService.getCarrito(this.userData.idUsuario));
      this.carrito = data;
      
      this.total = this.carrito.reduce((total, item) => total + (item.Precio || 0), 0) * 1.16;

      console.log('Carrito cargado:', this.carrito);
      console.log('Total calculado:', this.total);
      this.loading = false;
    } catch (error) {
      console.error('Error al cargar pedidos:', error);
      this.loading = false;
    }
  }

  httpPost(body) {
    return this.http.post<any>(environment.api + 'payment-sheet', body).pipe(first());
  }

  async paymentSheet() {
    if (!this.data.amount) {
      console.error('Error: datos de pago incompletos');
      return;
    }

    try {
      Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
        console.log('PaymentSheetEventsEnum.Completed');
      });

      const data$ = this.httpPost(this.data);
      console.log(data$);

      const { paymentIntent, ephemeralKey, customer } = await lastValueFrom(data$);

      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        merchantDisplayName: 'Esau',
      });
      console.log(paymentIntent, ephemeralKey, customer);
      

      const result = await Stripe.presentPaymentSheet();
      if (result && result.paymentResult === PaymentSheetEventsEnum.Completed) {
        this.splitAndJoin(paymentIntent);
        console.log(this.userData.idUsuario, this.carrito[0].idCarrito,this.total ,this.direcciones[0].DireccionID)
        this.pedidosS.crearPedidos(this.userData.idUsuario, this.carrito[0].idCarrito,this.total ,this.direcciones[0].DireccionID);
        this.verificarEncuesta();
      }
    } catch (e) {
      console.log(e);
    }
  }


 
   async googlePay() {
     const isAvailable = Stripe.isGooglePayAvailable().catch(() => undefined);
     if (isAvailable === undefined) {
       return;
     }
   
     Stripe.addListener(GooglePayEventsEnum.Completed, () => {
       console.log('GooglePayEventsEnum.Completed');
     });
     
     const data$ = this.httpPost(this.data);
 
     const { paymentIntent } = await lastValueFrom(data$);
 
     await Stripe.createGooglePay({
       paymentIntentClientSecret: paymentIntent,
 
       paymentSummaryItems: [{
         label: this.userData.Nombre,
         amount: this.total * 100
       }],
       merchantIdentifier: 'Esau',
       countryCode: 'MX',
       currency: 'MXN',
     });
 
     const result = await Stripe.presentGooglePay();
     if (result.paymentResult === GooglePayEventsEnum.Completed) {
      this.pedidosS.crearPedidos(this.userData.idUsuario, this.carrito[0].idCarrito,this.total ,this.direcciones[0].DireccionID);
       this.splitAndJoin(paymentIntent);
     }
   }

  splitAndJoin(paymentIntent) {
    const result = paymentIntent.split('_').slice(0, 2).join('_');
    console.log(result);
    return result;
  }
}
