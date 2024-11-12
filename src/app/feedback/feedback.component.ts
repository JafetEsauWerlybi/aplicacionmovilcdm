import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent  implements OnInit {

  constructor(private modalController: ModalController) {}

  async cerrarEncuesta(respondida: boolean) {
    if (respondida) {
      // Guardar que la encuesta ha sido respondida en localStorage
      localStorage.setItem('encuestaRespondida', 'true');
    }
    await this.modalController.dismiss();
  }
  ngOnInit() {}

}
