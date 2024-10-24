import { Component, OnInit } from '@angular/core';
import { AlertasService } from '../services/alertas.service';
import { RecuperarpasswordService } from '../services/recuperarpassword.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  
  email: string = '';
  bol : boolean = false;
  constructor(private alertaService: AlertasService, private recuperarService: RecuperarpasswordService) { }

  ngOnInit() {
    this.bol = false;
  }

  async onSubmit() {
    if(this.email.length > 0){
      this.bol = await this.recuperarService.verificarCorreo(this.email);  
      if (!this.bol){
        await this.alertaService.presentAlertFalla('No encontramos una cuenta asociada a ese correo');
      }
      else{
        await this.recuperarService.guardarEmail(this.email);
      }
    }else{
      this.alertaService.presentAlertFalla('Captura tus datos correctamente por favor');
    }
  }

  
}
