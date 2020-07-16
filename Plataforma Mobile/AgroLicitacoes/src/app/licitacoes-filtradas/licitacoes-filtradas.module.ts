import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LicitacoesFiltradasPageRoutingModule } from './licitacoes-filtradas-routing.module';

import { LicitacoesFiltradasPage } from './licitacoes-filtradas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LicitacoesFiltradasPageRoutingModule
  ],
  declarations: [LicitacoesFiltradasPage]
})
export class LicitacoesFiltradasPageModule {}
