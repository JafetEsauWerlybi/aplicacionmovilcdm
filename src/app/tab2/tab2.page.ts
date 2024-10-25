import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products } from '../interface/products';
import { UserData } from '../interface/userData';
import { PerfilService } from '../services/perfil.service';
import { CarritoService } from '../services/carrito.service';
import { IonModal } from '@ionic/angular';
import { AlertasService } from '../services/alertas.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  userData!: UserData;
  products: Products[]= [];
  productoSelect!: Products;
  @ViewChild('productModal') productModal!: IonModal;

  constructor(
    private productsService: ProductsService,
    private perfilService: PerfilService,
    private carritoService: CarritoService,
    private alertaS : AlertasService
  ) {

  }

  ngOnInit() {
    this.traerDatosUsuario(); // Asegúrate de llamar a la función para cargar al usuario
    this.getALLProducts();
  }

  ionViewWillEnter() {
    this.traerDatosUsuario();
    this.getALLProducts();
  }

  getALLProducts(){
    this.productsService.getALLProducts()
    .subscribe(products =>{
      this.products= products;
      console.log(products)
    })
  }

  
  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }

  async traerDatosUsuario() {
    try {
      // Intenta obtener los datos del usuario desde el perfilService
      this.userData = await this.perfilService.obtenerDatosUsuario();
  
      // Verifica si los datos son nulos o vacíos
      if (!this.userData || !this.userData.idUsuario) {
        // Si no hay datos del usuario, asigna los datos de usuario invitado
        this.userData = {
          idUsuario: 0,
          Nombre: 'Invitado',
          ApellidoPaterno: 'Invitado',
          ApellidoMaterno: 'Invitado',
          Correo: 'invitado@example.com',
          Telefono: 'Invitado',
          Rol: 0,
          EstadoCuenta: 'Invitado',
          Token: 'Invitado',
          Icono: 'https://example.com/default-icon.png',
        };
      }
  
      console.log('Datos del usuario obtenidos:', this.userData);
    } catch (error) {
      console.error('Error al obtener datos de usuario', error);
  
      // Si ocurre un error al obtener los datos del usuario, asigna el usuario invitado
      this.userData = {
        idUsuario: 0,
        Nombre: 'Invitado',
        ApellidoPaterno: 'Invitado',
        ApellidoMaterno: 'Invitado',
        Correo: 'invitado@example.com',
        Telefono: 'Invitado',
        Rol: 0,
        EstadoCuenta: 'Invitado',
        Token: 'Invitado',
        Icono: 'https://example.com/default-icon.png',
      };
    }
  }
  
  setUserDataForTesting(userData: UserData) {
    this.userData = userData;
  }
  
  async agregarAlCarrito(idProducto: number) {
    const exito = await this.carritoService.agregarAlCarrito(this.userData.idUsuario, idProducto);
    if(exito){
      this.alertaS.presentAlert('Producto agregado');
    }
  }

  obtenerDetalleProducto(idProducto: number) {
    this.productsService.obtenerDetallesProducto(idProducto).subscribe({
      next: (producto: Products) => {
        this.productoSelect = producto;
        //console.log('Producto seleccionado:', this.productoSelect);
        this.productModal.present();
      },
      error: (error) => {
        console.error('Error al obtener los detalles del producto', error);
      }
    });
  }
  canDismiss2() {
    return true;
  }

}
