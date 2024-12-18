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

  showSplash = true;

  constructor(
    private userStorageService: UserStorageService,
    private navController: NavController
  ) {}

  async ngOnInit() {
    // Verifica si estás en un entorno de prueba de Cypress
    if ((window as any).Cypress) {
      // Si estás en modo prueba, omite splash, redirección y cualquier otra lógica
      this.showSplash = false;
      return;
    }

    // Lógica normal de splash y redirección
    setTimeout(() => {
      this.checkUserSession();
    }, 1000); 

    setTimeout(() => {
      this.showSplash = false;
    }, 3000);
  }

  async checkUserSession() {
    // Obtén los datos del usuario desde el almacenamiento
    const userData: UserData = await this.userStorageService.traerDatosUsuario();
    
    console.log('Datos de usuario al iniciar:', userData); // Verifica si userData es null o tiene información
    
    if (userData) {
      // Si existe userData, redirige al home
      this.navController.navigateRoot('/home/tabs/tab1');
    } 
  }
}
