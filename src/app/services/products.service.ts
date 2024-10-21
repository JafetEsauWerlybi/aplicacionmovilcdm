import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Products } from '../interface/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productoSelect!: Products;

  productosURl = environment.apiEndpointsProductos.traerProductos;
  productoSelectUrl = environment.apiEndpointsProductos.traerProductoPorId;
  constructor(
    private http: HttpClient
  ) { }

  getALLProducts(){
    return this.http.get<Products[]>(this.productosURl);
  }

  obtenerDetallesProducto(idProducto: number){
    const formdata = new FormData();
    formdata.append("idProducto", idProducto.toString());

    return this.http.post<Products>(this.productoSelectUrl,formdata);
  }



}
