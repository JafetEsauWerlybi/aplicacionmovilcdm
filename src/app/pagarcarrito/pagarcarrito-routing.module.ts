import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagarcarritoPage } from './pagarcarrito.page';

const routes: Routes = [
  {
    path: '',
    component: PagarcarritoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagarcarritoPageRoutingModule {}
