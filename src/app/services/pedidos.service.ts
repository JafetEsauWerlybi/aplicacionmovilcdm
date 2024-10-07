import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedidos } from '../interface/pedidos';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private apiUrl = 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerPedidos?UsuarioID=6'; // Cambia esto por tu URL de API

  constructor(private http: HttpClient) { }

  getPedidos(){
    return this.http.get<Pedidos>(this.apiUrl);
  }
}
