import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/auth/user';

import firebase from 'firebase/app';
import 'firebase/auth';

export type UserOrNull = User | null | undefined;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: Observable<UserOrNull>;

  public get user(): Observable<UserOrNull> {
    return this._user;
  }

  private fireauth: AngularFireAuth;
  private firestore: AngularFirestore;
  private router: Router;

  constructor(theFireauth: AngularFireAuth, theFirestore: AngularFirestore, theRouter: Router) {
    this.fireauth = theFireauth;
    this.firestore = theFirestore;
    this.router = theRouter;

    this._user = this.fireauth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async signIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.fireauth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.fireauth.signOut();
    this.router.navigateByUrl("/");
  }

  private updateUserData(user: any) {
    const userRef: AngularFirestoreDocument = this.firestore.doc(`users/${user.uid}`);

    const data = { 
      uid: user.uid,
      name: user.displayName,
      email: user.email, 
      photoUrl: user.photoURL || ""
    }

    return userRef.set(data, { merge: true });
  }

  public canAddAnime(user: UserOrNull): boolean {
    const allowed = ["admin"];
    return this.checkAuthorization(user, allowed);
  }

  public canEditAnime(user: UserOrNull): boolean {
    const allowed = ["admin"];
    return this.checkAuthorization(user, allowed);
  }

  private checkAuthorization(user: UserOrNull, allowedRoles: Array<string>): boolean {
    if (!user) {
      return false;
    }

    let userRole: keyof typeof user.roles;
    for (const allowRole of allowedRoles) {
      for (userRole in user.roles) {
        if (userRole == allowRole) {
          return user.roles[userRole] || false;
        }
      }
    }

    return false;
  }

}
