import { Component, OnInit,Input } from '@angular/core';
import { ApiService } from '../services/api-service.service';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-licitacao-detalhes',
  templateUrl: './licitacao-detalhes.page.html',
  styleUrls: ['./licitacao-detalhes.page.scss'],
})
export class LicitacaoDetalhesPage implements OnInit {

  @Input() id_licitacao: string;

  licitacao: any;
  loteAtual: any;

  loading = this.loadingController.create({
    spinner: 'crescent',
    message: 'Obtendo Licitação...'
  });
  
  constructor(private api: ApiService, public loadingController: LoadingController, private modalCtrl : ModalController) {}

  fecharModal () {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  showSelectValue (mySelect) {
    this.loteAtual = this.licitacao['LotesLicitacao'][mySelect]
  }

  validarInformacoes() {
    if (this.licitacao != undefined) {
      return true
    }else {
      return false
    }
  }

  validarConteudo() {
    if (this.licitacao != undefined) {
      console.log(true);
      return true
    }else {
      console.log(false);
      return false
    }
  }

  async presentLoading(typePresent) {
    if (typePresent === 'active') {
      await (await this.loading).present();
    }else {
      await (await this.loading).dismiss();
    }
  }

  ngOnInit() {
    this.presentLoading('active')
    this.api.get_one_licitacao(this.id_licitacao).subscribe( dataRes => {
      this.licitacao = dataRes;
      this.presentLoading('desative')
      console.log(this.licitacao);
    })
  }
}