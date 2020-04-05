import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private alertCtrl: AlertController,
              private router: Router) {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['home']);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.controls.email.value;
      const password = this.loginForm.controls.password.value;
      this.authService.login(email, password);
    } else {
      this.presentAlert();
    }
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Error!',
      message: 'Please fill in the email and password fields.',
      buttons: ['Okay']
    });

    await alert.present();
  }
}
