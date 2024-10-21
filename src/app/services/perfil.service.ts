import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserStorageService } from './user-storage.service';
import { environment } from 'src/environments/environment';
import { UserData } from '../interface/userData';
import { Token } from '../interface/token';
import { Router } from '@angular/router';
import { Direccion } from '../interface/pedidos';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  Token!: Token
  telefono : string = '';
  tokenUrl = environment.apiEndpoints.traerToken;
  userData1!: UserData;
  obtenerDireccionURL = environment.apiEndpoints.obtenerDireccion;
  
  constructor(private http: HttpClient,
    private userStorage: UserStorageService,
    private router: Router
  ) { }


  async obtenerDatosUsuario(){
    this.userData1 = await this.userStorage.traerDatosUsuario();
    this.telefono = this.userData1.Telefono
    return this.userData1;
  }

  traerToken() {
    console.log(this.telefono);
    return this.http.get<Token>(this.tokenUrl + this.telefono);  // Retorna un Observable directamente
  }
  cerrarSesion(){
    this.userStorage.borrarDatosUsuario();
    this.router.navigate(['/login']);
  }
  
  traerDirecciones(idUsuario : number){
    return this.http.get<Direccion[]>(this.obtenerDireccionURL+ idUsuario);
  }
  
}
