import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;

  constructor(private userService: UserService,
              private authService: AuthService,
              private navCtrl: NavController) {
    if (this.authService.isLoggedIn()) {
      this.navCtrl.navigateRoot(['/tabs/feed']);
    }
  }

  ngOnInit() {
    this.initForm();
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

  onSubmit(): void {
    if (this.signupForm.valid) {
      const email = this.signupForm.controls.email.value;
      const password = this.signupForm.controls.password.value;
      const username = this.signupForm.controls.username.value;
      const name = this.signupForm.controls.name.value;

      this.userService.usernameExists(username).then((exists) => {
        if (!exists) {
          this.authService.signup(email, password).then((credentials) => {

            const user = {
              id: credentials.user.uid,
              username,
              email,
              name,
            };

            this.userService.createUser(user).then(() => {
              this.authService.logout();
            }).catch((error) => {
              console.log(error);
            });
          }).catch((error) => {
            console.log(error);
          });
        } else {
          console.log('Username is already taken.');
        }
      });

    } else {
      console.log('Error');
    }
  }

  goToLogin(): void {
    this.navCtrl.navigateBack(['']);
  }

}
