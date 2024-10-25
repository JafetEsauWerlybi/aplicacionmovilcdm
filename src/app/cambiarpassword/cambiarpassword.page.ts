import { Component, OnInit } from '@angular/core';
import { CambiarpasswordService } from '../services/cambiarpassword.service';
import { AlertasService } from '../services/alertas.service';

@Component({
  selector: 'app-cambiarpassword',
  templateUrl: './cambiarpassword.page.html',
  styleUrls: ['./cambiarpassword.page.scss'],
})
export class CambiarpasswordPage implements OnInit {
  password : string = '';
  passwordVerified : string = '';
  bol : boolean = false;
  passwordVisible: boolean = false;  // Controla la visibilidad del campo de contraseña
  passwordVerifiedVisible: boolean = false;  // Controla la visibilidad del campo de confirmación de contraseña

  constructor(private cambiarpwdService : CambiarpasswordService, private alertasService : AlertasService) { }

  ngOnInit() {
    this.bol = false;
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  // Alterna la visibilidad del campo de confirmación de contraseña
  togglePasswordVerifiedVisibility() {
    this.passwordVerifiedVisible = !this.passwordVerifiedVisible;
  }
  async verificarPassword() {
    console.log(this.password, 'HOLA', this.passwordVerified);
    this.bol = await this.cambiarpwdService.verificarPassword(this.password, this.passwordVerified);
  
    if (!this.bol) {
      this.alertasService.presentAlertFalla('No contiene 8 caracteres, o no contiene algun caracter especial');
    } else {
      await this.cambiarpwdService.cambiarPassword(this.password);
      this.alertasService.presentAlert('Contraseña cambiada exitosamente');
    }
  }
  

}
