import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  loginUrl: string = environment.apiEndpoints.loginUrl;
  traerDatosURL: string = environment.apiEndpoints.traerDatosUsuario;


  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  onSubmit() {
    if(this.email.length >0 && this.password.length >0){
      var result = this.login(); 
      
    }else{

      this.presentAlertFalla();

    }
    
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Éxito!',
      message: 'Los datos se han guardado correctamente.',
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }
  async presentAlertFalla() {
    const alert = await this.alertController.create({
      header: 'Falla!',
      message: 'Los datos se han guardado correctamente.',
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }


  async login(){
      const data = new FormData();
      data.append("Correo", this.email);
      data.append("Contrasena", this.password);
      data.append("ip", '212121'); 
      fetch(this.loginUrl , {
        method: "POST",
        body: data,
      }).then((res) => res.json())
      .then((result)=>{
        if (result =="Error en tus credenciales"){
          this.presentAlertFalla()
        }
        if(result=="Contraseña correcta"){
          this.presentAlert()
          this.obtenerDatos()
        }
      }
    )
  }

  async obtenerDatos(){
    const response = await fetch(this.traerDatosURL+ this.email,{
      method: "GET",
    });
    if (response.ok) {
      const userData = await response.json();
      console.log(userData)
    }
  }
  
}
