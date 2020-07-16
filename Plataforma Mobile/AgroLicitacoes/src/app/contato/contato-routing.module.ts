import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContatoPage } from './contato.page';

const routes: Routes = [
  {
    path: '',
    component: ContatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContatoPageRoutingModule {}
