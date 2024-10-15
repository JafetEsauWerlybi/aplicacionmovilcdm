import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(private alertController: AlertController) { }

  async presentAlert(Exito: string) {
    const alert = await this.alertController.create({
      header: '¡Éxito!',
      message: Exito,
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

