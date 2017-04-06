import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ShoppingList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	selector: 'page-shopping-list',
	templateUrl: 'shopping-list.html'
})

export class ShoppingListPage {

  public shoppingList: [any]

	constructor(public navCtrl: NavController, public storage: Storage, public navParams: NavParams ) {}

	ionViewWillEnter() {
		console.log("Shopping List initing");
		this.getData();
	}

	ionViewDidLoad() {
  	console.log('ionViewDidLoad ShoppingListPage');
  }

  getData() {
  	this.storage.get('shoppingList').then((shoppingList => {
  		this.shoppingList = shoppingList;
  	}));
  }

  clear(api) {
  	var index = this.shoppingList.indexOf(api)
  	this.shoppingList.splice(index, 1);
  	this.storage.set('shoppingList', this.shoppingList);
  }
}
