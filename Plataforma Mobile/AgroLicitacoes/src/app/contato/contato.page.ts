import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage implements OnInit {

  constructor(
    public alertController: AlertController,
    public modalController: ModalController,
    public loadingController: LoadingController,

    public platform: Platform,

  ) { }

  loading = this.loadingController.create({
    spinner: 'crescent',
    message: 'Carregando', 
  });

  fecharModal () {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  ngOnInit() {
  }

}
