import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;
  loadingIndicator: any;
  loading = false;

  constructor(private userService: UserService,
              private authService: AuthService,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
    this.authService.user$.subscribe((user) => {
      console.log('signup constructor');
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
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      name: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  async onSubmit(): Promise<void> {
    this.presentLoading();

    if (this.signupForm.valid) {
      const email = this.signupForm.controls.email.value;
      const password = this.signupForm.controls.password.value;
      const username = this.signupForm.controls.username.value;
      const name = this.signupForm.controls.name.value;

      try {
        const exists = await this.userService.usernameExists(username);
        const credentials = await this.authService.signup(email, password);

        const user = {
          id: credentials.user.uid,
          username,
          email,
          name,
        };

        const createdUser = await this.userService.createUser(user);
        const logout = await this.authService.logout();
        this.dismissLoading();
        this.presentAlertConfirm('Welcome aboard!', 'Your account has been created successfully.');
      } catch (error) {
        this.dismissLoading();
        this.presentAlert('Something went wrong', error.message);
      }

    } else {
      this.dismissLoading();
      this.presentAlert('Something went wrong', 'Please fill in all the fields correctly.');
    }
  }

  goToLogin(): void {
    this.navCtrl.navigateBack(['']);
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

  async presentAlertConfirm(title: string, body: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: body,
      buttons: [
        {
          text: 'Got It',
          handler: () => {
            this.navCtrl.navigateRoot(['']);
          }
        }
      ]
    });

    await alert.present();
  }
}
