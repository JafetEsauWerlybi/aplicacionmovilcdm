import { Component, OnInit ,HostListener} from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { UserData } from '../interface/userData';
import { CarritoService } from '../services/carrito.service';
import { Carrito } from '../interface/Carrito';
import { PerfilService } from '../services/perfil.service';
import { NavController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  private _storage: Storage | null = null;
  userData!: UserData;
  loading: boolean = true;
  carrito: Carrito[] = [];
  noPedidos: boolean = false;
  totalCarritoSinIVa=0;
  iva=0;
  totalFinal=0;

  constructor(private storage: Storage, private carritoService: CarritoService, private perfilService: PerfilService, private nav:NavController) {}

  async ngOnInit() {
    this._storage = await this.storage.create();
    await this.traerDatosUsuario();
    this.cargarCarrito();
  }

  ionViewWillEnter() {
    this.traerDatosUsuario();
    this.cargarCarrito();
  }

  pagarGoTo(){
    this.nav.navigateForward('/pagarcarrito');
  }

  async traerDatosUsuario() {
    try {
      this.userData = await this.perfilService.obtenerDatosUsuario();
    } catch (error) {
      console.error('Error al obtener datos de usuario', error);
    }
  }
  
  cargarCarrito() {
    this.loading = true;
    this.noPedidos = false; // Restablece `noPedidos` en cada carga

    if (!this.userData || !this.userData.idUsuario) {
      console.error('Error: idUsuario no está disponible');
      this.loading = false;
      return;
    }

    setTimeout(() => {
      if (this.carrito.length === 0) {
        this.noPedidos = true;
      }
      this.loading = false;
    }, 2000);

    this.carritoService.getCarrito(this.userData.idUsuario).subscribe(
      (data) => {
        this.carrito = data; // Asegúrate de que `data` sea un array de `Carrito`
        
        console.log(this.carrito)
        this.loading = false;
        this.totalCarritoSinIVa = this.carrito.reduce((total, item) => {
          return total + item.PrecioUnitario * item.Cantidad;
        }, 0);

        this.iva= this.totalCarritoSinIVa* 0.16;
        this.totalFinal=this.totalCarritoSinIVa+this.iva;        
        if (this.carrito.length > 0) {
          this.noPedidos = false; // Si hay elementos, asegura que `noPedidos` esté en falso
        }
      },
      (error) => {
        console.error('Error al cargar pedidos', error);
        this.loading = false;
      }
    );
  }

  async quitarCarrito(idProducto: number, idCarrito: number) {    
    const exito = await this.carritoService.quitarDelCarrito(this.userData.idUsuario, idProducto, idCarrito);
    
    if (exito) {
      this.cargarCarrito(); // Recarga la lista del carrito para mostrar los cambios
    } else {
      console.error('No se pudo eliminar el producto del carrito');
    }
  }

  async quitarTodoCarrito(idProducto:number, idCarritoProductos:number){
    const exito= await this.carritoService.elimarTodosProductos(this.userData.idUsuario, idProducto, idCarritoProductos)
    if(exito){
      console.log('eliminado');
      this.cargarCarrito();
    }else{
      console.log('algo fallo');
    }
  }

  async agregarAlCarrito(idProducto: number) {
    const exito = await this.carritoService.agregarAlCarrito(this.userData.idUsuario, idProducto);
    
    if (exito) {
      this.cargarCarrito(); // Recarga la lista del carrito para mostrar los cambios
    } else {
      console.error('No se pudo agregar el producto al carrito');
    }
  }
}
