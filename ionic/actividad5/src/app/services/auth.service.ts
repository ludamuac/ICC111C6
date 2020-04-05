import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;

  constructor(private afa: AngularFireAuth,
              private router: Router,
              private alertCtrl: AlertController) {
    this.afa.authState.subscribe(user => {
      if (user) {
        this.storeUser(user);
      } else {
        this.user = null;
        this.router.navigate(['']);
      }
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user !== undefined) ? true : false;
  }

  storeUser(user: any): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  login(email: string, password: string): Promise<void> {
    return this.afa.auth.signInWithEmailAndPassword(email, password)
      .then((credentials) => {
        this.storeUser(credentials.user);
        this.router.navigate(['home']);
      }).catch((error) => {
        this.presentAlert();
      });
  }

  logout(): Promise<void> {
    return this.afa.auth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['']);
      });
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Error!',
      message: 'Your credentials are incorrect. Please try again',
      buttons: ['Okay']
    });

    await alert.present();
  }
}
