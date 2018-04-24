import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth/auth';


import firebase from "firebase";

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  userInfo = "user: ";

  constructor(
    private fire: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {

      var user = firebase.auth().currentUser;

      if (user){
        this.userInfo += user.displayName;
      } else {
        this.userInfo += "Non user";
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  logoutOfFacebook(){
    this.fire.auth.signOut().then(res => {   
      console.log(res);   
      this.navCtrl.pop();
    });

    
  }

}
