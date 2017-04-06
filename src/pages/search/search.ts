import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { ApiAuthentication } from '../../providers/api-authentication'
import { DetailsPage } from '../details/details';
import { Http } from "@angular/http"
import { FormBuilder, FormGroup } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [ApiAuthentication, Keyboard]
})

export class SearchPage {

  @ViewChild(Content) content:Content;
  
  detailsPage = DetailsPage;
  public myForm: FormGroup;
  public tags: Array<string>;
  recipes: any;

  constructor(public keyboard: Keyboard, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public apiAuthentication: ApiAuthentication, private http: Http) {
    this.tags = [];
    this.myForm = this.formBuilder.group({
      tags: ['']
    });
    this.myForm.get('tags')
      .valueChanges
      .subscribe((value: string) => {
        if(value.indexOf(' ') > -1) {
          let newTag = value.split(' ')[0];
          console.log(newTag);
          if(newTag) {
            this.tags.push(newTag);
            this.myForm.get('tags').setValue('');
          }
          this.searchRecipeDB(this.tags);
        }
      });
    }

    ngAfterViewInit() {
      this.content.ionScroll.subscribe((data) => {
        this.keyboard.close();
      });
    }


  public deleteTag(tagName: string) { 
    // Find the index of the tag
    let index = this.tags.indexOf(tagName);

    // Delete the tag in that index
    this.tags.splice(index, 1);

    if(this.tags.length > 0){
    	this.searchRecipeDB(this.tags);
    } else{
    	this.recipes = null;
    }
  }

  goToDetails(id) {
    console.log(id);
    this.navCtrl.push(DetailsPage, {id: id});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  searchRecipeDB(ingredients: string[]) {
  	// Searches by Ingredient only
  	if(ingredients.length > 0){
  		this.apiAuthentication.searchRecipesByIngredients(ingredients).subscribe( data => {
  			this.recipes = data.matches;
  		}, err => {
  			console.log(err);
  		})
  	}
  }
}
