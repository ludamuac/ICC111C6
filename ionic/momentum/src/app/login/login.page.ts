import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const email = this.loginForm.controls.email.value;
      const password = this.loginForm.controls.password.value;

      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((credentials) => {
          console.log(credentials);
        })
        .catch((error) => {
          console.log(error);
        });

    } else {
      console.log('Error');
    }
  }

  logOut(): void {
    this.afAuth.auth.signOut()
      .then(() => {
        console.log('Signed out');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
