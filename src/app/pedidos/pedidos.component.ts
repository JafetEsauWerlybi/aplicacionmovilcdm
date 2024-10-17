import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../services/pedidos.service';
import { Pedidos } from '../interface/pedidos';
import { UserData } from '../interface/userData';
import { PerfilService } from '../services/perfil.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {
  misPedidos!: Pedidos;
  loading: boolean = true;
  userData!: UserData;

  constructor(private pedidosService: PedidosService, private perfilService: PerfilService) {}

  ngOnInit() {
    this.datosUsuario();
  }

  async datosUsuario() {
    try {
      this.userData = await this.perfilService.obtenerDatosUsuario();
      console.log('userData:', this.userData);
      this.cargarPedidos(); // Cargar pedidos solo después de obtener los datos del usuario
    } catch (error) {
      console.error('Error al obtener datos de usuario', error);
    }
  }

  cargarPedidos() {
    if (!this.userData || !this.userData.idUsuario) {
      console.error('Error: idUsuario no está disponible');
      this.loading = false;
      return;
    }

    console.log('usercomponente', this.userData.idUsuario);
    this.pedidosService.getPedidos(this.userData.idUsuario).subscribe(
      (data) => {
        this.misPedidos = data;
        this.loading = false;
        console.log(this.misPedidos);
      },
      (error) => {
        console.error('Error al cargar pedidos', error);
        this.loading = false;
      }
    );
  }
}