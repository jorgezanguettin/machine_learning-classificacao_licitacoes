import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { LicitacaoDetalhesPage } from './licitacao-detalhes/licitacao-detalhes.page';
import { RegistrarPage } from "./registrar/registrar.page"
import { ContatoPage } from "./contato/contato.page"

import { AuthGuardService } from './services/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { IonicStorageModule } from '@ionic/storage';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, LicitacaoDetalhesPage, RegistrarPage, ContatoPage],
  entryComponents: [LicitacaoDetalhesPage, RegistrarPage, ContatoPage],
  imports: [FormsModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    AuthGuardService,
    AuthenticationService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
