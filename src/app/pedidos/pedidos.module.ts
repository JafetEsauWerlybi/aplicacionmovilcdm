import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PedidosComponent } from './pedidos.component';

@NgModule({
  declarations: [PedidosComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [PedidosComponent] // Exporta el componente para que sea accesible en otros módulos
})
export class PedidosModule {}
