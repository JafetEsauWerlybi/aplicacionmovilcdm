import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagarcarritoPageRoutingModule } from './pagarcarrito-routing.module';

import { PagarcarritoPage } from './pagarcarrito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagarcarritoPageRoutingModule
  ],
  declarations: [PagarcarritoPage]
})
export class PagarcarritoPageModule {}
