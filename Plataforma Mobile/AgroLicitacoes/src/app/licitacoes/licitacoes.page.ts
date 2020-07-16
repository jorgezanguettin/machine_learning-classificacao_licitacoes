import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api-service.service';
import { ModalController } from '@ionic/angular';
import { LicitacaoDetalhesPage } from '../licitacao-detalhes/licitacao-detalhes.page';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-licitacoes',
  templateUrl: './licitacoes.page.html',
  styleUrls: ['./licitacoes.page.scss'],
})

export class LicitacoesPage implements OnInit {
  constructor(private api: ApiService, public modalController: ModalController, public loadingController: LoadingController) {}

  all_licitacoes: any;
  all_licitacoes_full: any;

  loading = this.loadingController.create({
    spinner: 'crescent',
    message: 'Carregando', 
  });

  validarCampo(campo) {
    if (campo != undefined) {
      return true
    }else {
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

  searchInList(val) {
    if (val && val.trim() != '') {
      this.all_licitacoes = this.all_licitacoes_full;
      this.all_licitacoes = this.all_licitacoes.filter((item) => {
        return (item.Objeto.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else if (val == '') {
      this.all_licitacoes = this.all_licitacoes_full;
    }
  }

  async presentModal(id) {
    const modal = await this.modalController.create({
      component: LicitacaoDetalhesPage,
      componentProps: {
        'id_licitacao': id,
      }
    });
    return await modal.present();
  }

  getAllLicitacoes() {
    this.api.get_all_licitacao_categoria("Outros").subscribe( data => {
      this.all_licitacoes = data;
      this.all_licitacoes_full = data;
      console.log(this.all_licitacoes)
      this.presentLoading('desactive')
    })
  }

  ngOnInit() {
    this.presentLoading('active')
    this.getAllLicitacoes()
  }

}