import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { AlertController } from 'ionic-angular';
import { AuthenticatorService } from "../../providers/authenticator";
import { Loader } from '../../providers/loader';
import { User } from "../../providers/user";
import { Storage } from '@ionic/storage';
import { DetailsPage } from '../details/details';
/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

export class SettingsPage {

  public favorites: [any]

  userFormBuilder: any;
  userDetails: User;

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    private formBuilder: FormBuilder,
    private loader: Loader,
    private alertCtrl: AlertController,
    private authenticatorService: AuthenticatorService,
    private af: AngularFire
  ) {
    let uid = authenticatorService.getUser().uid;
    this.userDetails = new User(uid);
  }

  ionViewWillEnter(){
  	this.getData();
  }

  getData() {
    this.storage.get('favorites').then((favorites => {
        this.favorites = favorites;
    }));
  }

  goToDetails(id) {
    console.log(id);
    this.navCtrl.push(DetailsPage, {id: id});
  }

  ionViewWillLoad() {
    console.debug("prepare form control " + this.constructor.name);
    this.userFormBuilder = this.formBuilder.group({
      fullName: ['', Validators.required]
    });
  }

  updateUserSettings() {
    console.debug("updating user details on firebase " + this.constructor.name);
    let fullName = this.userDetails.fullName;
    this.loader.show("Updating your settings...");
    this.userDetails.update({ fullName: fullName })
    .then((user) => {
        this.loader.hide();
        this.alertCtrl.create({
          title: 'Success',
          message: 'Details updated',
          buttons: [{ text: 'Ok' }]
        }).present();
    })
    .catch((e) => {
      this.loader.hide();
      console.error(`Password Login Failure:`, e)
      this.alertCtrl.create({
        title: 'Error',
        message: `Failed to update details. ${e.message}`,
        buttons: [{ text: 'Ok' }]
      }).present();
    });
  }

  logout() {
    this.af.auth.logout();
  }
}