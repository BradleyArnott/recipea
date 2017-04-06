import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoryPage } from '../category/category';
import { Categories } from '../../providers/categories';
import { IntroPage } from '../intro/intro';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

  public categoryPage = CategoryPage;
  public categoryList: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public categories: Categories) {
    this.categoryList = categories.all();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.storage.get('intro-done').then(done => {
      if (!done) {
        this.storage.set('intro-done', true);
        this.navCtrl.setRoot(IntroPage);
      }
    });
  }
}
