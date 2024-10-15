import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UserStorageService } from './user-storage.service';
import { TokensService } from './tokens.service';

@Injectable({
  providedIn: 'root'
})
export class RecuperarpasswordService {

  verificarCorreoURL = environment.apiEndpoints.verificarCorreo;

  constructor(private http: HttpClient, private router: Router, private storageService: UserStorageService, private tokenService: TokensService) { 
  }

 
  verificarCorreo(email:string): Promise<boolean>{
    const formData = new FormData();
    formData.append("Correo", email);

    return this.http.post(this.verificarCorreoURL, formData)
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

  async guardarEmail(email:string){
   this.storageService.guardarEmail(email);
   this.tokenService.actualizarToken(email);
   this.router.navigate(['/token']);
  }

}
