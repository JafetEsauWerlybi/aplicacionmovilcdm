import { Component, OnInit } from '@angular/core';
import { UserStorageService } from './services/user-storage.service';
import { NavController } from '@ionic/angular';
import { UserData } from './interface/userData';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private userStorageService: UserStorageService,
    private navController: NavController
  ) {}

  async ngOnInit() {
    setTimeout(() => {
      this.checkUserSession();
    }, 1000); 
  }

  async checkUserSession() {
    // Obtén los datos del usuario desde el almacenamiento
    const userData: UserData = await this.userStorageService.traerDatosUsuario();
    
    console.log('Datos de usuario al iniciar:', userData); // Verifica si userData es null o tiene información
    
    if (userData) {
      // Si existe userData, redirige al home
      this.navController.navigateRoot('/home/tabs/tab1');
    } else {
      // Si no existe userData, redirige al login
      this.navController.navigateRoot('/');
    }
  }
}
