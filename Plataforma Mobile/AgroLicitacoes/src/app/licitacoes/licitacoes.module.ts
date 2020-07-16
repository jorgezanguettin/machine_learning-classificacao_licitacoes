import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LicitacoesPageRoutingModule } from './licitacoes-routing.module';

import { LicitacoesPage } from './licitacoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LicitacoesPageRoutingModule
  ],
  declarations: [LicitacoesPage]
})
export class LicitacoesPageModule {}
