import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Products } from '../interface/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getALLProducts(){
    const path="https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerProductos";
    return this.http.get<Products[]>(path);
  }

}
