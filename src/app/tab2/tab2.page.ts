import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products } from '../interface/products';
import { UserData } from '../interface/userData';
import { PerfilService } from '../services/perfil.service';
import { CarritoService } from '../services/carrito.service';
import { IonModal,ToastController } from '@ionic/angular';
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
  
  filteredProducts: Products[] = []; // Productos filtrados
  searchTerm: string = ''; // Término de búsqueda
  maxPrice: number = 1000; // Establece un valor máximo inicial para el precio

  constructor(
    private productsService: ProductsService,
    private perfilService: PerfilService,
    private carritoService: CarritoService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.traerDatosUsuario(); // Asegúrate de llamar a la función para cargar al usuario
    this.getALLProducts();
  }

  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      position: "top",
    });

    await toast.present();
  }

  ionViewWillEnter() {
    this.traerDatosUsuario();
    this.getALLProducts();
  }

  getALLProducts(){
    this.productsService.getALLProducts()
    .subscribe(products =>{
      this.products= products;
      this.filteredProducts = products;
      //console.log(products)
    })
  }



 filtrarProductos() {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.Nombre.toLowerCase().includes(term) &&
      product.Precio <= this.maxPrice
    );
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
          idUsuario: 20,
        Nombre: 'Jafet Esaú',
        ApellidoPaterno: 'Guzmán',
        ApellidoMaterno: 'Martínez',
        Correo: '20211041@uthh.edu.mx',
        Telefono: '7711425326',
        Rol: 1,
        EstadoCuenta: 'Activo',
        Token: 'mockToken123',
        Icono: 'https://example.com/icon.png',
        };
      }
  
      console.log('Datos del usuario obtenidos:', this.userData);
    } catch (error) {
      console.error('Error al obtener datos de usuario', error);
  
      // Si ocurre un error al obtener los datos del usuario, asigna el usuario invitado
      this.userData = {
        idUsuario: 20,
        Nombre: 'Jafet Esaú',
        ApellidoPaterno: 'Guzmán',
        ApellidoMaterno: 'Martínez',
        Correo: '20211041@uthh.edu.mx',
        Telefono: '7711425326',
        Rol: 1,
        EstadoCuenta: 'Activo',
        Token: 'mockToken123',
        Icono: 'https://example.com/icon.png',
      };
    }
  }
  
  
  setUserDataForTesting(userData: UserData) {
    this.userData = userData;
  }
  
  async agregarAlCarrito(idProducto: number) {
    const exito = await this.carritoService.agregarAlCarrito(this.userData.idUsuario, idProducto);
    if(exito=== true){
      this.presentToast("Se agrego al carrito");
    }else{
      this.presentToast("Accion no realizada");
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
