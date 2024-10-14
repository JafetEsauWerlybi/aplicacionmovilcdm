import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products } from '../interface/products';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  
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

  
  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }

}
