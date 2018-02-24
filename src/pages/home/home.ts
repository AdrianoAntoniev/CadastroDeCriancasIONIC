import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import {  ProviderCriancasProvider, Child, ChildList } from '../../providers/provider-criancas/provider-criancas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  childs: ChildList[];  

  constructor(public navCtrl: NavController, 
              private provider: ProviderCriancasProvider, private toast: ToastController) {
    
    
  }

  ionViewDidEnter() {
    this.provider.getAll()
        .then(results => {
          this.childs = results;
        });
  }

  addChild() {
    this.navCtrl.push('EditCriancasPage');
  }

  editChild(item: ChildList) {
    this.navCtrl.push('EditCriancasPage', { key: item.key, child: item.child});
  }

  removeChild(item: ChildList) {
    this.provider.remove(item.key)
      .then(() => {
        let index = this.childs.indexOf(item);
        this.childs.splice(index, 1);

        this.toast.create( {
          message: 'Contato removido!',
          duration: 3000, 
          position: 'bottom'
        } ).present();
      });
  }
}
