import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiAuthentication } from '../../providers/api-authentication'
import { DetailsPage } from '../details/details';

/*
  Generated class for the Category page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
  providers: [ApiAuthentication]
})

export class CategoryPage {

  public api: any;
  detailsPage = DetailsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiAuthentication: ApiAuthentication) {
  	this.loadRecipes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage', this.navParams);
  }

  loadRecipes(scroll?:any,start?:any){
    return new Promise(resolve => {
      this.apiAuthentication.loadCategory(this.navParams.data)
      .then(data => {
        this.api = data;
      });
    }) 
  }

  goToDetails(id) {
    console.log(id);
    this.navCtrl.push(DetailsPage, {id: id});
  }

}
