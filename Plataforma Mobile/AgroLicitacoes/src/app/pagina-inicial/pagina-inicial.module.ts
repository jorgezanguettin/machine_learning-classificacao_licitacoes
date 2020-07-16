import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaInicialPageRoutingModule } from './pagina-inicial-routing.module';

import { PaginaInicialPage } from './pagina-inicial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaInicialPageRoutingModule
  ],
  declarations: [PaginaInicialPage]
})
export class PaginaInicialPageModule {}
