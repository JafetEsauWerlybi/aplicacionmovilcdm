import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Promociones } from '../interface/Promociones';

@Injectable({
  providedIn: 'root'
})
export class PromocionesService {
  promocionesURL = environment.apiEndpointsPedidos.promociones;

  promociones : Promociones[]=[];

  constructor(private http : HttpClient) { }


  getALLPromociones(){
    return this.http.get<Promociones[]>(this.promocionesURL);
  }

}
