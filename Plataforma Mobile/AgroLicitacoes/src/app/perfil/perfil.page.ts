import { Component, OnInit } from '@angular/core';
import { ApiService } from "../services/api-service.service"
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service'
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';

import { ContatoPage } from '../contato/contato.page';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
    public alertController: AlertController,
    private api: ApiService,
    private storage: Storage,
    private authService: AuthenticationService,
    public loadingController: LoadingController,
    public modalController: ModalController,
  ) { }

  email: any;

  loading = this.loadingController.create({
    spinner: 'crescent',
    message: 'Carregando', 
  });

  async presentLoading(typePresent) {
    if (typePresent === 'active') {
      await (await this.loading).present();
    }else {
      await (await this.loading).dismiss();
    }
  }

  async presentAlertSucess(typeMessage) {
    if (typeMessage === "change_password") {
      const alert = await this.alertController.create({
        header: 'Sucesso',
        message: 'Sua nova foi alterada com sucesso!',
        buttons: ['OK']
      });
      await alert.present();
    } else if (typeMessage === "delete_user") {
      const alert = await this.alertController.create({
        header: 'Sucesso',
        message: 'Sua nova foi excluida com sucesso!',
        buttons: ['OK']
      });
      await alert.present();
      this.authService.logout()
    } else if (typeMessage === "send_sugestao") {
      const alert = await this.alertController.create({
        header: 'Sucesso',
        message: 'Obrigado! Nós iremos analisar sua sugestão',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async presentAlertError(typeMessage) {
    if (typeMessage === "change_password") {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Sua nova senha deve conter mais de 8 digitos!',
        buttons: ['OK']
      });
      await alert.present();
    } else if (typeMessage === "delete_user") {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'A senha digitada está incorreta!',
        buttons: ['OK']
      });
      await alert.present();
    } else if (typeMessage === "send_sugestao") {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Estamos com um erro interno, você poderia tentar mais tarde?',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async presentAlertAlterarSenha() {
    const alert = await this.alertController.create({
      header: 'Alterar Senha',
      inputs: [
        {
          name: 'email_atual',
          type: 'text',
          value: this.email,
          placeholder: 'Digite Seu E-mail Antigo',
          disabled: true
        },{
          name: 'senha_atual',
          type: 'password',
          placeholder: 'Digite a Senha Antiga'
        },
        {
          name: 'nova_senha',
          type: 'password',
          placeholder: 'Digite a Nova Senha'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: data => {
            this.api.trocar_senha({
              'novaSenha' : data.nova_senha,
              'email' : data.email_atual,
              'senha' : data.senha_atual
            }).subscribe( data_api => {
              if (data_api["code"] === 502) {
                this.presentAlertError("change_password")
              } else {
                this.presentAlertSucess("change_password")
              }
            })
          }
        }
      ]
    });

    await alert.present();
  }

  alterar_senha () {
    this.presentAlertAlterarSenha();
  }

  async presentAlertExcluirConta() {
    const alert = await this.alertController.create({
      header: 'Excluir Conta',
      inputs: [
        {
          name: 'email',
          type: 'text',
          value: this.email,
          placeholder: 'Digite Seu E-mail',
          disabled: true
        },{
          name: 'senha',
          type: 'password',
          placeholder: 'Digite a Senha'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
        }, {
          text: 'Confirmar',
          handler: data => {
            this.api.deletar_conta({
              'email' : this.email,
              "senha" : data["senha"]
            }).subscribe( data_api => {
              if (data_api["code"] === 200) {
                this.presentAlertSucess("delete_user")
              }
              else {
                this.presentAlertError("delete_user")
              }
            })
          }
        }
      ]
    });

    await alert.present();
  }

  excluir_contato () {
    this.presentAlertExcluirConta()
  }

  async presentAlertSugestoes() {
    const alert = await this.alertController.create({
      header: 'Enviar Sugestão',
      inputs: [
        {
          name: 'sugestao_text',
          type: 'textarea',
          placeholder: 'Conte para a gente qual a sua sugestão'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
        }, {
          text: 'Confirmar',
          handler: data => {
            this.api.cadastrar_sugestao({
              'email' : this.email,
              'sugestao' : data["sugestao_text"]
            }).subscribe( data_api => {
              if (data_api["code"] === 200) {
                this.presentAlertSucess("send_sugestao")
              }
              else {
                console.log(data_api)
                this.presentAlertError("send_sugestao")
              }
            })
          }
        }
      ]
    });

    await alert.present();
  }

  enviar_sugestoes() {
    this.presentAlertSugestoes()
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ContatoPage
    });
    return await modal.present();
  }

  ngOnInit() {
    this.presentLoading('active')
    this.storage.get("USER_INFO").then( data => {
      this.email = data["email"];
      this.presentLoading('desactive')
    })
  }

}
