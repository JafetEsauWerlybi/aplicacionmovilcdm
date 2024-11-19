import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PerfilService } from '../services/perfil.service';
import { UserData } from '../interface/userData';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent  implements OnInit {
  userData!: UserData;
  responses = {
    catalogExperience: '',
    orderProcess: '',
    paymentProcess: ''
  };


  constructor(private modalController: ModalController ,
    private perfilService:PerfilService,
    private nav:NavController
  ) {}

  questions = [
    {
      id: 1,
      question: '¿Qué te parecio el catalogo de platillos ?',
      subtext: 'Comparte tu estado de ánimo para ayudarnos a entender.',
      options: ['😔', '😐','😁'],
      field: 'catalogExperience',
    },
    {
      id: 2,
      question: '¿Cómo fue tu experiencia con la compra de platillos?',
      subtext: 'Háganos saber para mejorar su experiencia.',
      options: ['😔', '😐', '😁'],
      field: 'orderProcess',
    },
    {
      id: 3,
      question: '¿Cómo sentiste el proceso de pago en la aplicación?',
      subtext: 'Tus respuestas nos ayudan a crecer.',
      options: ['😔', '😐', '😁'],
      field: 'paymentProcess',

    },
  ];

  currentQuestionIndex = 0; // Índice de la pregunta actual

  // Función para pasar a la siguiente pregunta
  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.enviarFeecback();
    }
  }

  async cerrarEncuesta() {
  
    await this.modalController.dismiss();
    
  }
  async ngOnInit() {
    await this.traerDatosUsuario();
  }
    
  async traerDatosUsuario() {
    try {
      this.userData = await this.perfilService.obtenerDatosUsuario();
      console.log('Datos de usuario obtenidos:', this.userData);
    } catch (error) {
      console.error('Error al obtener datos de usuario:', error);
    }
  }


  async enviarFeecback(){
    const questionsMap = [
      { field: 'catalogExperience', idPregunta: 4 },
      { field: 'orderProcess', idPregunta: 5 },
      { field: 'paymentProcess', idPregunta: 6 },
    ];

    try {
      const results = await Promise.all(
        questionsMap.map(async ({ field, idPregunta }) => {
          const calificacion = this.responses[field];
          return this.perfilService.enviarRespuesta(calificacion, idPregunta, this.userData.idUsuario);
        })
      );

      const allSuccessful = results.every(result => result === true);

      if (allSuccessful) {
        console.log("Respuestas de feedback enviadas correctamente:", this.responses);
        this.cerrarEncuesta();
        this.nav.navigateForward('/home/tabs/tab1'); // Navega a la página de pedidos
      } else {
        alert("Ocurrió un error al enviar algunas respuestas de feedback.");
      }
    } catch (error) {
      console.error("Error al enviar el feedback:", error);
      alert("Ocurrió un error al enviar el feedback.");
    }

  }

}
