import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedidos } from '../interface/pedidos';
import { environment } from 'src/environments/environment';
import { UserData } from '../interface/userData';
import { UserStorageService } from './user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private apiUrl = environment.apiEndpointsPedidos.obtenerPedidos;
  userData!: UserData;
  constructor(private http: HttpClient, private userStprage: UserStorageService) { }

  getPedidos(idUsuario:number){
    return this.http.get<Pedidos>(this.apiUrl+idUsuario);
  }


}
