import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicitacoesFiltradasPage } from './licitacoes-filtradas.page';

const routes: Routes = [
  {
    path: '',
    component: LicitacoesFiltradasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicitacoesFiltradasPageRoutingModule {}
