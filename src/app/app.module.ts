import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';

import { AngularFireAuthModule } from 'angularfire2/auth';

import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';

var config = {
  apiKey: "AIzaSyCK0TBqUcv_gsNB_wrqQRj89Osv6AxXxBo",
  authDomain: "authtest-abec5.firebaseapp.com",
  databaseURL: "https://authtest-abec5.firebaseio.com",
  projectId: "authtest-abec5",
  storageBucket: "authtest-abec5.appspot.com",
  messagingSenderId: "343635406499"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),    
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage
  ],
  providers: [
    StatusBar,
    SplashScreen,    
    GooglePlus,
    Facebook,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
