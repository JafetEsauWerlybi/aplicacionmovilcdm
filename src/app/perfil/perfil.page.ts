import { Component, ViewChild } from '@angular/core';
import { PedidosService } from '../services/pedidos.service'; // Ajusta la ruta según tu estructura de carpetas
import { IonModal } from '@ionic/angular';
import { Pedidos } from '../interface/pedidos';
import { PerfilService } from '../services/perfil.service';
import { UserData } from '../interface/userData';
import { Token } from '../interface/token';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  @ViewChild(IonModal) modal!: IonModal;
  misPedidos!: Pedidos; 
  userData!: UserData;
  token!: Token;

  constructor(private pedidosService: PedidosService, private perfilService: PerfilService) { }

  ngOnInit() {
    this.datosUsuario();
  }

  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }
  async datosUsuario() {
    this.userData = await this.perfilService.obtenerDatosUsuario();
  
    this.perfilService.traerToken().subscribe({
      next: (data: Token) => {
        this.token = data;
        console.log('Token recibido en el componente:', this.token);
      },
      error: (error) => {
        console.error('Error al traer el token', error);
      }
    });
  }
  
  cerrarSesion(){
    this.perfilService.cerrarSesion();
  }

  
  onCancel() {
    this.modal.dismiss();
  }
}
