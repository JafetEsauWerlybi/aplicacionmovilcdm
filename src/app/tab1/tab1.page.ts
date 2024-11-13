import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products } from '../interface/products';
import { Promociones } from '../interface/Promociones';
import { PromocionesService } from '../services/promociones.service';
import { IonModal } from '@ionic/angular';
import { PerfilService } from '../services/perfil.service';
import { CarritoService } from '../services/carrito.service';
import { UserData } from '../interface/userData';
import { AlertasService } from '../services/alertas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  products: Products[]=[];
  lastThreeProducts: Products[] = [];
  promociones : Promociones[]=[];
  productoSelect!: Products;
  userData!: UserData;

  @ViewChild('productModalHome') productModal!: IonModal;

  constructor(private productsService: ProductsService, private promocionesS: PromocionesService,private perfilService: PerfilService,private carritoService: CarritoService, private alertaS : AlertasService
  ) {}

  ngOnInit() {
    this.traerDatosUsuario(); // Asegúrate de llamar a la función para cargar al usuario
    this.getALLProducts();
    this.getALLPromocion();
  }

  ionViewWillEnter() {
    this.traerDatosUsuario(); // Asegúrate de llamar a la función para cargar al usuario
    this.getALLProducts();
    this.getALLPromocion();
  }
  
  async traerDatosUsuario() {
    try {
      this.userData = await this.perfilService.obtenerDatosUsuario();
    } catch (error) {
      console.error('Error al obtener datos de usuario', error);
    }
  }
  
  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }

  async agregarAlCarrito(idProducto: number) {
    const exito = await this.carritoService.agregarAlCarrito(this.userData.idUsuario, idProducto);
    if(exito){
      this.alertaS.presentAlert('Producto agregado');
    }
  }

  getALLProducts() {
    this.productsService.getALLProducts().subscribe({
      next: (products) => {
        // Verifica que 'products' sea un array y tenga al menos 3 elementos antes de usar 'slice'
        if (products && products.length > 0) {
          this.products = products;
          this.lastThreeProducts = products.slice(-3);
        } else {
          //console.warn('No hay productos disponibles para mostrar.');
          this.lastThreeProducts = [];
        }
        //console.log('Últimos tres productos:', this.lastThreeProducts);
      },
      error: (error) => {
        //console.error('Error al obtener productos:', error);
      }
    });
  }


  getALLPromocion() {
    this.promocionesS.getALLPromociones().subscribe({
      next: (products) => {
        if (products && products.length > 0) {
          this.promociones = products.slice(-1);
          //console.log(this.promociones)
        } else {
          //console.warn('No hay productos disponibles para mostrar.');
          this.promociones = [];
        }
        //console.log('Promociones:', this.promociones);
      },
      error: (error) => {
        //console.error('Error al obtener productos:', error);
      }
    });
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
}
