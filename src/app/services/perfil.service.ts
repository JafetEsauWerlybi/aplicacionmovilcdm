import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserStorageService } from './user-storage.service';
import { User } from '@codetrix-studio/capacitor-google-auth';
import { environment } from 'src/environments/environment';
import { UserData } from '../interface/userData';
import { Token } from '../interface/token';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  Token!: Token
  telefono : string = '';
  tokenUrl = environment.apiEndpoints.traerToken;
  userData1!: UserData;
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
  
  
}
