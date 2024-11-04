import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products } from '../interface/products';
import { UserData } from '../interface/userData';
import { PerfilService } from '../services/perfil.service';
import { CarritoService } from '../services/carrito.service';
import { IonModal,ToastController } from '@ionic/angular';


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
    this.traerDatosUsuario();
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
      this.userData = await this.perfilService.obtenerDatosUsuario();
      //console.log('Datos del usuario obtenidos:', this.userData);
    } catch (error) {
      //console.error('Error al obtener datos de usuario', error);
    }
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
