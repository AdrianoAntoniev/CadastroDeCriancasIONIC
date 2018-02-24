import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProviderCriancasProvider, Child } from '../../providers/provider-criancas/provider-criancas';

@IonicPage()
@Component({
  selector: 'page-edit-criancas',
  templateUrl: 'edit-criancas.html',
})
export class EditCriancasPage {
  model: Child;
  key: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private provider: ProviderCriancasProvider, private toast: ToastController) {

    if(this.navParams.data.child && this.navParams.data.key) {
      this.model = this.navParams.data.child;
      this.key = this.navParams.data.key;
    } else {
      this.model = new Child();
    }
  }

  save() {
    this.saveChild()
        .then(() => {
          this.toast.create({
            message: 'Contato salvo!',
            duration: 3000,
            position: 'bottom'
          }).present();
          this.navCtrl.pop();
        })
        .catch(() => {
          this.toast.create({
            message: 'Erro ao salvar contato!',
            duration: 3000,
            position: 'bottom'
          }).present();
        });
  }

  private saveChild() {
    if(this.key) {
      return this.provider.update(this.key, this.model);
    } else {
      return this.provider.insert(this.model);
    }
  }
 
}
