import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserStorageService } from './user-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl: string = environment.apiEndpoints.loginUrl;
  traerDatosURL: string = environment.apiEndpoints.traerDatosUsuario;
  verificarCorreoUrl: string = environment.apiEndpoints.verificarCorreo;

  constructor(private userStorageService: UserStorageService, private router: Router, private http: HttpClient) { }

  login(email: string, password: string): Promise<boolean> {
    const formData = new FormData();
    formData.append("Correo", email);
    formData.append("Contrasena", password);
    formData.append("ip", '212121');
  
      return this.http.post(this.loginUrl, formData)
      .toPromise()
      .then((result: any) => {
        if (result === "Error en tus credenciales") {
          return false;
        }
        if (result === "Contraseña correcta") {
          return true;
        }
        return false;
      })
      .catch((error) => {
        console.error('Error during login:', error);
        return false;
      });
  }
  
  async obtenerDatos(email: string): Promise<void> {
    return this.http.get(this.traerDatosURL + email)
      .toPromise()
      .then((userData: any) => {
        this.userStorageService.guardarUsuario(userData);
        this.router.navigate(['/home/tabs/tab1']);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);  
      });
  }

  verificarCorreo(email:string): Promise<boolean>{
    const formData = new FormData();
    formData.append("Correo", email);

    return this.http.post(this.verificarCorreoUrl, formData)
      .toPromise()
      .then((result: any) => {
        if (result === "No existe") {
          return false;
        }
        if (result === "Correo Existe") {
          return true;
        }
        return false;
      })
      .catch((error) => {
        console.error('Error during login:', error);
        return false;
      });
  }
  
}
