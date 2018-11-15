import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: firebase.User = null;
  user = null;
  isAuthenticated = false;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.afAuth.authState.subscribe(user => {
      console.log(user);
      if (user !== null) {
        this.authState = user;
        this.isAuthenticated = true;
        this.router.navigateByUrl('/home');
      } else {
        this.isAuthenticated = false;
        this.signInWithGoogle();
      }
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUser() {
    return this.authenticated ? this.authState : null;
  }

  signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithRedirect(provider).then(user => {
      console.log('Signed in successfully');
    });
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      console.log('Signed out successfully');
      this.router.navigateByUrl('/');
    });
  }
}
