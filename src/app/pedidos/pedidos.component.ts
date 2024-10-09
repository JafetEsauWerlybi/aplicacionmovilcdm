import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../services/pedidos.service';
import { Pedidos } from '../interface/pedidos';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit {
  misPedidos!: Pedidos;
  loading: boolean = true;

  constructor(private pedidosService: PedidosService) { }

  ngOnInit() {
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.pedidosService.getPedidos().subscribe(
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
