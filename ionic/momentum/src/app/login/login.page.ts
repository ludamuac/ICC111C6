import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  loadingIndicator;
  loading = false;

  constructor(private authService: AuthService,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
    this.authService.user$.subscribe((user) => {
      console.log('login constructor');
      if (user) {
        this.navCtrl.navigateRoot(['tabs']);
      }
    }, take(1));
  }

  ngOnInit() {
    this.initForm();
    this.createLoading();
  }

  initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit(): void {
    this.presentLoading();

    if (this.loginForm.valid) {
      const email = this.loginForm.controls.email.value;
      const password = this.loginForm.controls.password.value;

      this.authService.login(email, password).then(() => {
        this.dismissLoading();
        this.navCtrl.navigateRoot(['tabs']);
      }).catch((error) => {
        this.dismissLoading();
        this.presentAlert('Something went wrong', error.message);
      });

    } else {
      this.dismissLoading();
      this.presentAlert('Something went wrong', 'Please type in your email and password.');
    }
  }

  goToSignup(): void {
    this.navCtrl.navigateForward(['signup']);
  }

  async createLoading() {
    this.loadingIndicator = await this.loadingCtrl.create({
      message: 'Authenticating you...'
    });
  }

  async presentLoading() {
    this.loading = true;
    await this.loadingIndicator.present();
  }

  async dismissLoading() {
    this.loading = false;
    await this.loadingIndicator.dismiss();
  }

  async presentAlert(title: string, body: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: body,
      buttons: ['Got It']
    });

    await alert.present();
  }
}
