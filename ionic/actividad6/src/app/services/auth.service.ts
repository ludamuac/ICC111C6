import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  loading: any;

  constructor(private afa: AngularFireAuth,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
    this.afa.authState.subscribe(user => {
      if (user) {
        this.setUser(user);
      } else {
        this.user = null;
        this.navCtrl.navigateRoot(['']);
      }
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user !== undefined) ? true : false;
  }

  setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  clearUser(): void {
    localStorage.removeItem('user');
    this.user = null;
  }

  login(email: string, password: string): void {
    this.afa.auth.signInWithEmailAndPassword(email, password).then((credentials) => {
      this.setUser(credentials.user);
      this.navCtrl.navigateRoot(['/menu/']);
    }).catch((error) => {
      this.presentAlert('Error', error.message);
    });
  }

  logout(): void {
    this.afa.auth.signOut().then(() => {
      this.clearUser();
      this.navCtrl.navigateRoot(['']);
    });
  }

  async presentAlert(title: string, message: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: ['Okay']
    });

    await alert.present();
  }
}
