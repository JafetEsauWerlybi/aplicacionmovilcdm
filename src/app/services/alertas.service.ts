import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(private alertController: AlertController,    private toastController: ToastController // Inyecta el ToastController aquí
  ) { }

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

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, // Duración en milisegundos
      color: color, // Color del toast
      position: 'top', // Posición inicial del toast
      cssClass: 'custom-toast' // Clase personalizada para ajustar la posición
    });
    await toast.present();
  }
  
}

