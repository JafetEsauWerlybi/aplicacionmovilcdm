import { Component, OnInit,ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products } from '../interface/products';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  
  @ViewChild(IonModal) modal!: IonModal; 

  products: Products[]= [];
  constructor(
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.getALLProducts();
  }

  getALLProducts(){
    this.productsService.getALLProducts()
    .subscribe(products =>{
      this.products= products;
      console.log(products)
    })
  }

  selectedProduct: Products | null = null;

  setSelectedProduct(product: Products) {
    this.selectedProduct = product;
    this.modal.present(); 
  }
  
  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }

}
