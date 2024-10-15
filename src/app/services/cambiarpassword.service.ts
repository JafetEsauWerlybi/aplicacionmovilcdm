import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserStorageService } from './user-storage.service';
import { AlertasService } from './alertas.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CambiarpasswordService {
  cambiarPasswordUrl = environment.apiEndpoints.cambiarPassword;
  email : string = '';
  constructor(private http : HttpClient, private userStorageService : UserStorageService, private alertaService : AlertasService, private router: Router) { }

  verificarPassword(password: string, passwordVerified: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (password.length < 8) {
        return resolve(false);
      }  
      if (!/\d/.test(password)) {
        return resolve(false);
      }

      if (!/[A-Z]/.test(password)) {
        return resolve(false);
      }
      if (password !== passwordVerified) {
        return resolve(false);
      }
      return resolve(true);
    });
  }

  async cambiarPassword(password: string){
    this.email = await this.userStorageService.traerEmailGuardado();

    const formData = new FormData();
    formData.append('Correo', this.email);
    formData.append('Contrasena', password);
    formData.append('ip', '2021');
    
    this.http.post(this.cambiarPasswordUrl, formData)
    .toPromise()
    .then((result: any) => {
      if (result === "Error en las credenciales") {
        this.alertaService.presentAlertFalla('No se pudo intentalo más tarde');
      }
      if (result === "Contraseña modificada correctamente") {
        this.alertaService.presentAlert('Contraseña cambiada correctamente');
        this.router.navigate(['/login']);
      }
      return false;
    })
    .catch((error) => {
      console.error('Error during login:', error);
      return false;
    });
  }

    
}
