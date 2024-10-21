import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { UserData } from '../interface/userData';
import { CarritoService } from '../services/carrito.service';
import { Carrito } from '../interface/Carrito';
import { PerfilService } from '../services/perfil.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  private _storage: Storage | null = null;
  userData!: UserData;
  loading: boolean = true;
  carrito: Carrito[] = [];  // Asegúrate de que esta propiedad sea un array

  constructor(private storage: Storage, private carritoService: CarritoService, private perfilService: PerfilService) {}

  async ngOnInit() {
    this._storage = await this.storage.create();
    await this.traerDatosUsuario();
    this.cargarCarrito();
  }

  ionViewWillEnter() {
    this.traerDatosUsuario();
    this.cargarCarrito();
  }

  async traerDatosUsuario() {
    try {
      this.userData = await this.perfilService.obtenerDatosUsuario();
    } catch (error) {
      //console.error('Error al obtener datos de usuario', error);
    }
  }
  
  cargarCarrito() {
    if (!this.userData || !this.userData.idUsuario) {
      console.error('Error: idUsuario no está disponible');
      this.loading = false;
      return;
    }
    //console.log('usercomponente', this.userData.idUsuario);
    this.carritoService.getCarrito(this.userData.idUsuario).subscribe(
      (data) => {
        this.carrito = data; // Asegúrate de que `data` sea un array de `Carrito`
        this.loading = false;
        //console.log('Carrito actualizado:', this.carrito);
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
      //console.log('Producto eliminado del carrito');
      this.cargarCarrito(); // Recarga la lista del carrito para mostrar los cambios
    } else {
      //console.error('No se pudo eliminar el producto del carrito');
    }
  }
  async agregarAlCarrito(idProducto: number) {
    
    const exito = await this.carritoService.agregarAlCarrito(this.userData.idUsuario, idProducto);
    
    if (exito) {
      //console.log('Producto eliminado del carrito');
      this.cargarCarrito(); // Recarga la lista del carrito para mostrar los cambios
    } else {
      console.error('No se pudo eliminar el producto del carrito');
    }
  }
  
}
