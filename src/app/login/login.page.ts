import { Component, OnInit } from '@angular/core';
import { AlertController, isPlatform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { UserStorageService } from '../services/user-storage.service';  
import { LoginService } from '../services/login.service';
import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  loginUrl: string = environment.apiEndpoints.loginUrl;
  bol : boolean = false;
  usuario: User | null = null;
  

  constructor(
    private alertController: AlertController, 
    private userStorageService: UserStorageService, 
    private serviciosLogin: LoginService) {
      
      if(!isPlatform('capacitor')){
        GoogleAuth.initialize();
      }
     }

  ngOnInit() {
    
  }

  async long(){
    this.usuario = await GoogleAuth.signIn();
    this.email = this.usuario.email;
    this.bol = await this.serviciosLogin.verificarCorreo(this.email);
    if (!this.bol){
      await this.presentAlertFalla('No encontramos una cuenta asociada a ese correo');
    }
    else{
      await this.presentAlert();
      this.serviciosLogin.obtenerDatos(this.email);
    }
    console.log('user: ', this.email);
  }

  onSubmit() {
    if(this.email.length >0 && this.password.length >0){
      var result = this.login(); 
    }else{
      this.presentAlertFalla('Captura tus datos correctamente por favor');
    }
  }

  async login(){
    this.bol = await this.serviciosLogin.login(this.email, this.password);
    if(this.bol){
      await this.serviciosLogin.obtenerDatos(this.email);
    }
    else this.presentAlertFalla('Los datos ingresados han sido erroneos'); 
  }

  //alertas nada más
  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Éxito!',
      message: 'Los datos se han guardado correctamente.',
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }
  async presentAlertFalla(fallo:string) {
    const alert = await this.alertController.create({
      header: 'Falla!',
      message: fallo,
      buttons: ['Reintentar']
    });
  
    await alert.present();
  }
  
}
