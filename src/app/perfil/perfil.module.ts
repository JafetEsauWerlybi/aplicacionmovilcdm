import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PerfilPageRoutingModule } from './perfil-routing.module';
import { PerfilPage } from './perfil.page';
import { PedidosModule } from '../pedidos/pedidos.module'; // Importa el módulo de pedidos

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule,
    PedidosModule // Asegúrate de importar el módulo, no el componente
  ],
  declarations: [PerfilPage]
})
export class PerfilPageModule {}
