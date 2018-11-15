import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private afAuth: AngularFireAuth) {
    // this.login();
  }

  ngOnInit(): void {
    console.log('vrau');
    this.afAuth.auth
      .getRedirectResult()
      .then(function(result) {
        console.log('result');
        console.log(result);
        this.user = result.user;
        // this.router.navigateByUrl('/home');
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  login() {
    this.afAuth.auth
      .signInWithRedirect(new auth.GoogleAuthProvider())
      .then(user => {
        console.log('bla');
        console.log(user);
      });
  }
}
