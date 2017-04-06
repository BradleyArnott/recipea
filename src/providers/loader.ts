import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class Loader {

  loader: any;
  constructor(public http: Http, private loading: LoadingController) {
    console.log('Hello Loader Provider');
  }

  show(message) {
    this.loader = this.loading.create({ content: message });
    this.loader.present();
  }

  hide() {
    this.loader.dismiss();
  }

}
