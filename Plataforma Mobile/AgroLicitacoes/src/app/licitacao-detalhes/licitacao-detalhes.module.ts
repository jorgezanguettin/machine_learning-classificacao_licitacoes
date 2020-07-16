import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LicitacaoDetalhesPageRoutingModule } from './licitacao-detalhes-routing.module';

import { LicitacaoDetalhesPage } from './licitacao-detalhes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LicitacaoDetalhesPageRoutingModule
  ],
  declarations: [LicitacaoDetalhesPage]
})
export class LicitacaoDetalhesPageModule {}
