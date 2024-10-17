import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Products } from '../interface/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productosURl = environment.apiEndpointsProductos.traerProductos;
  
  constructor(
    private http: HttpClient
  ) { }

  getALLProducts(){
    return this.http.get<Products[]>(this.productosURl);
  }

}
