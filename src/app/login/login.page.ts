import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { UserStorageService } from '../services/user-storage.service';  
import { LoginService } from '../services/login.service';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { AlertasService } from '../services/alertas.service';
import { GoogleAuthProvider, User, getAuth, onAuthStateChanged, signInWithCredential } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { NavController } from '@ionic/angular';

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
  isWeb = false;
  firebase: any;
  passwordVisible: boolean = false;

  constructor( private alertaService: AlertasService,
    private userStorageService: UserStorageService, 
    private serviciosLogin: LoginService,
    private platform: Platform,
    private nav:NavController) {
      
      this.isWeb = this.platform.is('desktop') || this.platform.is('mobileweb') || !(this.platform.is('android') || this.platform.is('ios'));
        this.firebase = initializeApp(environment.firebase);
     }

  ngOnInit() {
    this.initialize();
  }

  inicio(){
    this.nav.navigateForward('/');
  }


  recuperarContra(){
    this.nav.navigateForward('/recuperar');
  }


  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  async long(){
    //this.usuario = await GoogleAuth.signIn();
    //this.email = this.usuario.email;
    this.bol = await this.serviciosLogin.verificarCorreo(this.email);
    if (!this.bol){
      await this.alertaService.presentAlertFalla('No encontramos una cuenta asociada a ese correo');
    }
    else{
      await this.alertaService.presentAlert('Exito se guardaron correctamente los datos');
      this.serviciosLogin.obtenerDatos(this.email);
    }
    //console.log('user: ', this.email);
  }

  onSubmit() {
    if(this.email.length >0 && this.password.length >0){
      var result = this.login(); 
    }else{
      this.alertaService.presentAlertFalla('Captura tus datos correctamente por favor');
    }
  }

  async login(){
    this.bol = await this.serviciosLogin.login(this.email, this.password);
    if(this.bol){
      await this.serviciosLogin.obtenerDatos(this.email);
      this.alertaService.presentAlert('Bienvenido de nuevo, disfruta tu estancia'); 
    }
    else this.alertaService.presentAlertFalla('Los datos ingresados han sido erroneos'); 
  }

  //alertas nada más
  initialize() {
    if (this.isWeb) {
        GoogleAuth.initialize({ grantOfflineAccess: true });
    }
}
  async loginViaGoogle() {
    try {
        const user = await GoogleAuth.signIn();
        if (user) {
            // Sign in with credential from the Google user.
            console.log('user: jjs',user)
            signInWithCredential(getAuth(this.firebase), GoogleAuthProvider.credential(user.authentication.idToken))
                .then(async (s) => {
                    const access_token = await s.user.getIdToken();
                    //await this.localStorageService.set(AppStorageKey.AccessToken, access_token);
                })
                .catch((error) => {
                    console.log(error);
                });
            //this.userService.login({ name: user.givenName, email: user.email, imageUrl: user.imageUrl });
          //this.router.navigateByUrl(AppPagePath.Home);
        }
    } catch (error) {
        console.log(error);
    }
}
}
