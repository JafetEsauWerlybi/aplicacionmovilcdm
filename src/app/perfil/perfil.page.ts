import { Component, ViewChild } from '@angular/core';
import { PedidosService } from '../services/pedidos.service'; // Ajusta la ruta según tu estructura de carpetas
import { IonModal } from '@ionic/angular';
import { Pedidos } from '../interface/pedidos';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  @ViewChild(IonModal) modal!: IonModal;
  misPedidos!: Pedidos; 

  constructor(private pedidosService: PedidosService) { }

  ngOnInit() {
    this.cargarMisPedidos();
  }

  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }

  cargarMisPedidos() {
    this.pedidosService.getPedidos().subscribe({
      next: (data) => {
        this.misPedidos = data; 
        console.log(this.misPedidos)
      },
      error: (error) => {
        console.error('Error al cargar los pedidos', error);
      }
    });
  }

  onCancel() {
    this.modal.dismiss();
  }
}
