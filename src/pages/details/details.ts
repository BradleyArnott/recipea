import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiAuthentication } from '../../providers/api-authentication'
import { Platform, ActionSheetController } from 'ionic-angular';
import { InAppBrowser, Geolocation, SocialSharing } from 'ionic-native';
import { Storage } from '@ionic/storage';
 
/*
  Generated class for the Details page.
 
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
 
declare var google;
 
@Component({
    selector: 'page-details',
    templateUrl: 'details.html',
    providers: [ApiAuthentication]
})
 
export class DetailsPage {
 
    // API
    /////////////////////////////////////////////////////////////////////
    public api: any;
 
    // Toggle
    /////////////////////////////////////////////////////////////////////
    visible = false;
 
    // ID
    /////////////////////////////////////////////////////////////////////
    public id;
 
    constructor(public toastCtrl: ToastController,
                public navCtrl: NavController,
                private navParams: NavParams,
                public storage: Storage,
                public apiAuthentication: ApiAuthentication,
                private platform: Platform,
                private ngZone: NgZone,
                public actionSheetCtrl: ActionSheetController) {
                    this.loadDetails1(navParams.get('id'));
                    console.log(navParams.get('id'));
                    this.id = navParams.get('id');
                    this.platform = platform;
                    this.whatsappShare = this.whatsappShare;
                    this.twitterShare = this.twitterShare;
                    this.facebookShare = this.facebookShare;
                    this.instagramShare = this.instagramShare;
                }
 
    openActionSheet(){
        console.log('opening');
        let actionsheet = this.actionSheetCtrl.create({
            title:"Share",
            buttons:[{
                text: 'WhatsApp',
                handler: () => {
                    this.whatsappShare();
                }
            },{
                text: 'Twitter',
                handler: () => {
                    this.twitterShare();
                }
            }, {
                text: 'Facebook',
                handler: () => {
                    this.facebookShare();
                }
            }, {
                text: 'Instagram',
                handler: () => {
                    this.instagramShare();
                }
            }, {
                text: 'Cancel',
                role: 'cancel', // will always sort to be on the bottom
                icon: !this.platform.is('ios') ? 'close' : null,
                handler: () => {
                    console.log('Cancel clicked');
                }
            }]
        });
        actionsheet.present();
    }
 
    ionViewDidLoad() {
        console.log('ionViewDidLoad DetailsPage');
        this.loadMap();
    }
 
    whatsappShare(){
        SocialSharing.shareViaWhatsApp(this.api.source.sourceRecipeUrl);
    }
 
    twitterShare(){
        SocialSharing.shareViaTwitter(this.api.source.sourceRecipeUrl);
    }
 
    facebookShare(){
        SocialSharing.shareViaFacebook(this.api.source.sourceRecipeUrl);
    }
 
    instagramShare(){
        SocialSharing.shareViaInstagram(this.api.source.sourceRecipeUrl, this.api.images[0].hostedLargeUrl);
    }
 
    // Like Toggle
    /////////////////////////////////////////////////////////////////////
 
    toggle(api) {

        let addFavourite = this.toastCtrl.create({
          message: 'Saved to favourites',
          duration: 1000
        });

        let removeFavourite = this.toastCtrl.create({
          message: 'Removed from favourites',
          duration: 1000
        });

        this.visible = !this.visible;
        this.storage.get('favorites').then(favorites => {

            if(!favorites){
                favorites = [];
            }
 
            if(this.visible) {
                favorites.push(api)
                addFavourite.present();
            } else {
                var indexOfApi = favorites.findIndex(function(favoriteItem){

                    if (!favoriteItem){
                        return false;
                    }

                    removeFavourite.present();
                    return favoriteItem.id == api.id;
                });
 
                if(indexOfApi > -1){
                        favorites.splice(indexOfApi, 1);
                }
            }
 
            // Double check wether or not this in the favorites.
            // In the case where api was added mulitple times,
            // this will "leave it on", so that you can tap it
            // few times to remove all the instances.
            var indexOfApi = favorites.findIndex(function(favoriteItem){
            	if(!favoriteItem){
            		return false;
            	}
                return favoriteItem.id == api.id;
            });
 
            this.visible = indexOfApi > -1;
            this.storage.set('favorites', favorites);
        });
    }
 
    // Extenal Link
    /////////////////////////////////////////////////////////////////////
 
    launch(url) {
        this.platform.ready().then(() => {
            new InAppBrowser(url, '_system', 'location = yes');
        });
    }
 
    // Loading Recipes
    /////////////////////////////////////////////////////////////////////
 
  loadDetails1(id){
        this.apiAuthentication.loadDetails(id)
        .then(data => {
            this.api = data;
            this.storage.get('favorites').then(favorites => {
                if(favorites && favorites.length){
                    var indexOfApi = favorites.findIndex(function(favoriteItem){
                    	if(!favoriteItem){
                    		return false;
                    	}
                        return favoriteItem.id == data.id;
                    });
                }
                this.visible = indexOfApi > -1;
            });
        });
    }
 
    // Add to Shopping List
    /////////////////////////////////////////////////////////////////////
 
    public submit(api: any) {
 
        let toast = this.toastCtrl.create({
          message: 'Added to shopping list',
          duration: 1000
        });
 
        console.log(this.api);
        var thisRecipe = this.api;
 
        this.storage.get('shoppingList').then((shoppingList) => {
            if(!shoppingList){
                shoppingList = [];
            }
 
            shoppingList.push(thisRecipe);
 
            this.storage.set('shoppingList', shoppingList).then(result => {
                console.log("Added to Shopping List", result);
                toast.present();
            });
        });
    }
 
    // Google MAp
    /////////////////////////////////////////////////////////////////////
 
    @ViewChild('map') mapElement: ElementRef;
 
    map: any;
 
    loadMap(){
 
        Geolocation.getCurrentPosition().then((position) => {
 
        // Define Locations
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
        // Define Map Options
        let mapOptions = {
            center: latLng,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
 
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
        // Custom Pin for your locations
        let image = 'assets/icon/current-location.png';
 
        // Marker parameters
        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            icon: image,
            position: this.map.getCenter()
        });
 
        let content = "<h4>You are here!</h4>";
 
        this.addInfoWindow(marker, content);
 
        // Google places API
        let service = new google.maps.places.PlacesService(this.map);
 
        service.nearbySearch({
            location: latLng,
            radius: 5000,
            type: ['grocery_or_supermarket']
            }, (results, status) => {
                this.callback(results, status)
                console.log(results);
            });
 
        }, (err) => {
            console.log(err);
        });
 
    }
 
    callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                this.createMarker(results[i]);
            }
        }
    }
 
    createMarker(place){
        var marker = new google.maps.Marker({
            map: this.map,
            position: place.geometry.location,
            animation: google.maps.Animation.DROP,
        });
 
        let infowindow = new google.maps.InfoWindow();
 
        google.maps.event.addListener(marker, 'click', () => {
            this.ngZone.run(() => {
                infowindow.setContent(place.name);
                infowindow.open(this.map, marker);
            });
        });
    }
 
    addInfoWindow(marker, content){
 
        let infoWindow = new google.maps.InfoWindow({
            content: content
        });
 
        google.maps.event.addListener(marker, 'click', () => {
            this.ngZone.run(() => {
                infoWindow.open(this.map, marker);
            });
        });
    }
}