import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedidos } from '../interface/pedidos';
import { environment } from 'src/environments/environment';
import { UserData } from '../interface/userData';
import { UserStorageService } from './user-storage.service';
import { AlertasService } from './alertas.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private apiUrl = environment.apiEndpointsPedidos.obtenerPedidos;
  private agregarPedido = environment.apiEndpointsPedidos.agregarPedido;

  userData!: UserData;
  constructor(private http: HttpClient, private userStprage: UserStorageService, private alertasS: AlertasService, private router: Router) { }

  getPedidos(idUsuario:number){
    return this.http.get<Pedidos>(this.apiUrl+idUsuario);
  }

  async crearPedidos(idUsuario: number, idCarrito: number, total: number, idDireccion: number){
    const data= new FormData();
    data.append("idTipoPago",'2')
    data.append("idUsuario",idUsuario.toString())
    data.append("idCarrito",idCarrito.toString())
    data.append("Total",total.toString())
    data.append("idDireccion",idDireccion.toString())
    return this.http.post(this.agregarPedido, data)
      .toPromise()
      .then((result: any) => {
        if (result === "Error interno") {
          this.alertasS.presentAlertFalla('Error interno del servidor')
        }
        if (result === "Exito") {
          this.alertasS.presentAlert('Exito en su compra')
          //this.router.navigate(['/home/tabs/tab1']);
        }
        return false;
      })
      .catch((error) => {
        console.error('Error during login:', error);
        return false;
      });
  }


}
