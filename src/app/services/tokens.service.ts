import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserStorageService } from './user-storage.service';
@Injectable({
  providedIn: 'root'
})
export class TokensService {
  actualizarTokenURL = environment.apiEndpoints.actualizarToken;
  verificarTokenURL = environment.apiEndpoints.verificarToken;
  constructor(private http: HttpClient, private userStorageService: UserStorageService) {
    this.traerEmail();
   }

   async traerEmail(): Promise<string>{
    return await this.userStorageService.traerEmailGuardado();
   }

  actualizarToken(email:string){
    const formData = new FormData();
    formData.append('Correo', email);
    return this.http.post(this.actualizarTokenURL, formData)
    .toPromise()
    .then((result: any) => {
      
    })
    .catch((error) => {
      console.error('Error during login:', error);
      return false;
    });
  }

  validarToken(email:string, token:string): Promise<boolean>{
    const formData = new FormData();
    formData.append('Correo', email);
    formData.append('Token', token);
    return this.http.post(this.verificarTokenURL, formData)
    .toPromise()
    .then((result: any) => {
      if (result === "Error en el token") {
        return false;
      }
      if (result === "Credenciales validas") {
        return true;
      }
      return false;
    })
    .catch((error) => {
      console.error('Error during token verifiy:', error);
      return false;
    });
  }
  
}
