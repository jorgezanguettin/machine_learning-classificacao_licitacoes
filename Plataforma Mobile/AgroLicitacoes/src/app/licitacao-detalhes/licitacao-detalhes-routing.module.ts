import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicitacaoDetalhesPage } from './licitacao-detalhes.page';

const routes: Routes = [
  {
    path: '',
    component: LicitacaoDetalhesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicitacaoDetalhesPageRoutingModule {}
