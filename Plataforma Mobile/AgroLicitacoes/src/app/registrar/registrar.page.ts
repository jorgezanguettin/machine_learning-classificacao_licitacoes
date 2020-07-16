import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api-service.service';
import { AuthenticationService } from '../services/authentication.service'
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  constructor(
    public alertController: AlertController,
    public modalController: ModalController,
    private authService: AuthenticationService,
    private api:ApiService,
    public loadingController: LoadingController,
    ) { }

  nomeCompleto: String = '';
  email: String = '';
  senha: String = '';
  erro: any;
  messageErro: any;

  loading = this.loadingController.create({
    spinner: 'crescent',
    message: 'Carregando', 
  });

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Hmm, algo está errado',
      message: this.messageErro,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading(typePresent) {
    if (typePresent === 'active') {
      await (await this.loading).present();
    }else {
      await (await this.loading).dismiss();
    }
  }

  exibirErro () {
    if (this.erro === undefined) {
      this.messageErro = undefined
    } else if (this.erro === 501) {
      this.messageErro = "E-mail Invalido!"
    } else if (this.erro === 502) {
      this.messageErro = "A senha deve conter no minímo 8 digitos!"
    } else if (this.erro === 503) {
      this.messageErro = "Precisamos de um nome para você!"
    } else if (this.erro === 504) {
      this.messageErro = "Essa conta já existe!"
    } else if (this.erro === 505) {
      this.messageErro = "Estamos com problemas no servidor, tente mais tarde!"
    } else if (this.erro === 200) {
      this.messageErro = undefined
    }
    console.log(this.messageErro)
  }

  fecharModal () {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  registrar() {
    this.presentLoading("active")
    this.messageErro = undefined
    this.api.cadastrar({
      'nomeCompleto' : this.nomeCompleto,
      'email' : this.email,
      'senha' : this.senha
    }).subscribe( data => {
      this.erro = data["code"]
      if (this.erro === 200) {
        this.fecharModal()
        this.authService.loginOn({
          'email' : this.email,
          'senha' : this.senha      
        })
        this.presentLoading("disable")
      } else {
        this.exibirErro()
        this.presentLoading("disable")
        this.presentAlert()
      }
    })
  };

  ngOnInit() {
  }

}
