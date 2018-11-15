import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { DevicesService } from '../devices/shared/devices.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: firebase.User = null;
  user: firebase.User = null;
  isAuthenticated = false;
  userHub: string;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    // private devicesService: DevicesService
  ) {
    this.afAuth.authState.subscribe(user => {
      console.log(user);
      if (user !== null) {
        this.authState = user;
        this.user = user;
        this.isAuthenticated = true;
        this.userHub = this.currentUserHub;
        this.router.navigateByUrl('/home');

        console.log('User signed in');
      } else {
        this.isAuthenticated = false;

        console.log('User not signed in');
      }
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUser() {
    return this.authenticated ? this.authState : null;
  }

  get currentUserHub(): string {
    let hubId = null;
    const userRef = this.db.list(`users/${this.user.uid}/hubs`);
    const hubs = userRef.query.once('child_added', function(snapshot) {
      hubId = snapshot.key;
    });

    return hubId;
  }

  signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(user => {
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
