import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { AngularFire } from 'angularfire2';

// Authenticator
import { AuthenticatorService } from '../providers/authenticator';

// Root pages to be used based on authentication
import { LoginPage } from '../pages/authentication/login/login';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  template: `<ion-nav [root]="rootPage" swipeBackEnabled="false"></ion-nav>`,
  providers: [AuthenticatorService]
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    private events: Events,
    private af: AngularFire,
    private authenticatorService: AuthenticatorService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      // StatusBar.overlaysWebView(false); // let status bar overlay webview

      // Verify if user is logged in
      this.af.auth.subscribe(user => {
        if (user) {
          console.info("Logging in");
          authenticatorService.setUser(user);
          this.rootPage = TabsPage;
        } else {
          console.info("error");
          authenticatorService.invalidateUser();
          this.rootPage = LoginPage;
        }
      });

      // Available events for Authentication
      this.events.subscribe('user:login', user => {
        console.info("This was trigger by the user:login event.");
      });

      this.events.subscribe('user:create', user => {
        console.info("This was trigger by the user:create event.");
      });

      this.events.subscribe('user:resetPassword', user => {
        console.info("This was trigger by the user:resetPassword event.");
      });
    });
  }
}
