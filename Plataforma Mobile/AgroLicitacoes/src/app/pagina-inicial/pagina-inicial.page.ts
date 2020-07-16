import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service'
import { ApiService } from '../services/api-service.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.page.html',
  styleUrls: ['./pagina-inicial.page.scss'],
})
export class PaginaInicialPage implements OnInit {

  constructor(private api: ApiService,public platform: Platform, public Aut: AuthenticationService) {}

  totalLicitacoes: any = "--";
  totalLicitacoesAgro: any = "--";
  totalUsuarios: any = "--";

  deslogar() {
    this.Aut.logout()
  }

  getEstatisticas () {
    this.api.get_all_estatisticas().subscribe( data => {
      this.totalLicitacoes = data['totalLicitacoes']
      this.totalLicitacoesAgro = data['totalLicitacoesAgro']
      this.totalUsuarios = data['totalUsuarios']
    })
  } 

  ngOnInit() {
    this.getEstatisticas()
  }

}
