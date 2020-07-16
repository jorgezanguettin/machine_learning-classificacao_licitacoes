import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service'
import { ApiService } from "../services/api-service.service"

import { RegistrarPage } from "../registrar/registrar.page"
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public alertController: AlertController,private api: ApiService, private authService: AuthenticationService,  public modalController: ModalController, public loadingController: LoadingController) { }

  loading = this.loadingController.create({
    spinner: 'crescent',
    message: 'Carregando', 
  });

  email: any;
  senha: any;
  formData: any;
  messageErro: any;

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Hmm, algo está errado',
      message: this.messageErro,
      buttons: ['OK']
    });

    await alert.present();
  }

  loginInPlatform() {
    this.formData = {
      'email' : this.email,
      'senha' : this.senha
    }
    this.presentLoading("active")
    this.api.login(this.formData).subscribe( (data) => {
      console.log(data)
      if (data["code"] === 200) {
          this.messageErro = undefined
          this.authService.loginOn({
            "email" : this.formData.email
          })
          this.presentLoading("disable")
      }else {
        this.messageErro = "Email ou senha incorretos!"
        this.presentLoading("disable")
        this.presentAlert()
      }
    })
  }

  async presentModal(id) {
    const modal = await this.modalController.create({
      component: RegistrarPage
    });
    return await modal.present();
  }

  async presentLoading(typePresent) {
    if (typePresent === 'active') {
      await (await this.loading).present();
    }else {
      await (await this.loading).dismiss();
    }
  }

  ngOnInit() {
  }

}
