import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicitacoesPage } from './licitacoes.page';

const routes: Routes = [
  {
    path: '',
    component: LicitacoesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicitacoesPageRoutingModule {}
