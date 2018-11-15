import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = null;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.afAuth.authState.subscribe((user) => {
      this.authState = user;
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUser() {
    return this.authenticated ? this.authState : null;
  }

  signInWithGoogle() {
<<<<<<< HEAD
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
=======
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
>>>>>>> 26d3217ebda88c31a894869d8d503e6fc2a2e121
  }

  signOut() {
    this.afAuth.auth.signOut();
  }
}
