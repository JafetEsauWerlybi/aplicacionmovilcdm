import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products } from '../interface/products';
import { Promociones } from '../interface/Promociones';
import { PromocionesService } from '../services/promociones.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  products: Products[]=[];
  lastThreeProducts: Products[] = [];
  promociones : Promociones[]=[];

  constructor(private productsService: ProductsService, private promocionesS: PromocionesService) {}

  ngOnInit() {
    this.getALLProducts();
    this.getALLPromocion();
  }

  ionViewWillEnter() {
    this.getALLProducts();
    this.getALLPromocion();
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
}
