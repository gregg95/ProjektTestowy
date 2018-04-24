import { Component } from "@angular/core";
import { NavController, ToastController, ToastOptions } from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import firebase from "firebase";
import { Observable } from "rxjs/Observable";
import { MainPage } from "../main/main";
import { GooglePlus } from "@ionic-native/google-plus";
import { Facebook } from "@ionic-native/facebook";
import { Platform } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  items: Observable<any[]>;
  toastOptions: ToastOptions;
  lol = "?????";

  constructor(
    private fire: AngularFireAuth,
    public db: AngularFireDatabase,
    public navCtrl: NavController,
    private toast: ToastController,
    private platform: Platform,
    private gplus: GooglePlus,
    private fb: Facebook
  ) {
    this.items = db.list("test").valueChanges();
    var starCountRef = firebase
      .database()
      .ref("test/")
      .child("name");

    const vm = this;

    starCountRef.on("value", function(snapshot) {
      snapshot.val();
      vm.lol = snapshot.val();

      vm.toast.create({ message: vm.lol, duration: 3000 }).present();
    });

    var user = firebase.auth().currentUser;

    if (user){
      this.lol += user;
    } else {
      this.lol += "Non user";
    }
  }

  makeToast(message) {
    this.toast
      .create({
        message: message,
        duration: 2000
      })
      .present();
  }

  loginWithGoogle() {
    if (this.platform.is("cordova")) {
      console.log("NATIVE??");
      this.nativeGoogleLogin();
    } else {
      console.log("WEEB??");
      this.webGoogleLogin();
    }
  }

  async nativeGoogleLogin(): Promise<void> {
    try {
      const gplususer = await this.gplus.login({
        webClientId:
          "343635406499-oid2fv5ngeupmfmroce7nog6s5ck9r3g.apps.googleusercontent.com",
        offline: true,
        scopes: "profile email"
      });

      return await this.fire.auth
        .signInWithCredential(
          firebase.auth.GoogleAuthProvider.credential(gplususer.idToken)
        )
        .then(r => {
          this.makeToast("zalogowano");
          this.navCtrl.push(MainPage);
        });
    } catch (err) {
      this.toast.create({ message: "error" + err, duration: 3000 }).present();
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.fire.auth.signInWithPopup(provider);

      this.toast.create({ message: "zalogowano", duration: 2000 }).present();
      console.log("zalogowano");
      this.navCtrl.push(MainPage);
    } catch (err) {
      console.log(err);
    }
  }

  loginWithFacebook() {
    if (this.platform.is("cordova")) {
      this.nativeFbLogin();
    } else {
      this.webFbLogin();
    }
  }

  async nativeFbLogin(): Promise<void> {
    this.toast
            .create({ message: "ZAczynam", duration: 2000 })
            .present();
    return this.fb.login(['email']).then(res => {
      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      return firebase.auth().signInWithCredential(facebookCredential).then(res => {
        this.makeToast(JSON.stringify(res));
        this.navCtrl.push(MainPage);
      });
    });
  }

  async webFbLogin(): Promise<void> {
    this.fire.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(
        res => {
          this.toast
            .create({ message: "zalogowano", duration: 2000 })
            .present();
          console.log("zalogowano");
          this.navCtrl.push(MainPage);
        },
        error => {
          this.toast.create({ message: error, duration: 2000 }).present();
          console.log(error);
        }
      );
  }
}
