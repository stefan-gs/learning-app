import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import firebase from 'firebase/compat/app';
import * as auth from 'firebase/auth';
import { User } from '../interfaces/user';
import { EmailAuthProvider, reauthenticateWithCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: firebase.User | null = null;
  authState = new BehaviorSubject<firebase.User | null>(this.user);
  userLoggedIn: boolean;
  passwordChangeSuccessMessage:string = "Success! Youl will be redirected to the login page";
  

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.afAuth.authState.subscribe((user) => {
      this.user = user;
      this.authState.next(this.user);
    });
    this.userLoggedIn = false;
  }

  //methods for login, logout, signup, reset password etc

  //login user

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.userLoggedIn = true;
        this.router.navigate(['dashboard']);
      })
      .catch((error) => {
        console.log('Auth Service: login error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code) return { isValid: false, message: error.message };
        throw new Error('Unexpected error occurred');
      });
  }

  //Register (singup) method

  registerUser(user: User) {
    return this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        result.user?.updateProfile({ displayName: user.name });
        let emailLowerCase = user.email;

        this.afs.doc(`/users/${emailLowerCase}`).set({
          displayName_lower: user.name.toLowerCase(),
          email: user.email,
          email_lower: emailLowerCase,
        });
        const timestamp = firebase.firestore.Timestamp.now();
        this.afs.collection(`users/${emailLowerCase}/tasks`).add({
          title: 'What does [ngClass] do?',
          status: false,
          userAnswer: '',
          aiAnswer:'',
          grade: '',
          createdAt: timestamp
        }); //create a new tasks collection for the new user
      })
      .then(() => {
        return null;
      })
      .catch((error) => {
        console.log('Auth Service: signup error', error);
        if (error.code) return { isValid: false, message: error.message };
        throw new Error('Unexpected error occurred');
      });
  }

  //log out method

  logout() {
    this.afAuth
      .signOut()
      .then(() => {
        this.router.navigate(['home']);
        this.userLoggedIn = false;
      })
      .catch((error) => {
        console.log('error', error);
        if (error.code) return error;
      });
  }

  //reset password method

  resetPassword(email: string): Promise<any> {
    return this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        return error.message;
      });
  }

  //change password method
  changePassword(user: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const currentUser = firebase.auth().currentUser;
      const credentials = EmailAuthProvider.credential(user.email, user.userPassword);
      if (currentUser !== null) {
        reauthenticateWithCredential(currentUser, credentials)
          .then(() => {
            currentUser
              ?.updatePassword(user.newPassword)
              .then(() => {
                console.log('Update successful');
                resolve(this.passwordChangeSuccessMessage);
                setTimeout(() => {
                  this.logout();
                }, 3000);
              })
              .catch((error: any) => {
                console.log(error);
                reject(error.message);
              });
          })
          .catch((error) => {
            console.log(error.message);
            reject(error.message);
          });
      } else {
        reject('User not logged in');
      }
    });
  }
  

 // Sign in with Google
 GoogleAuth() {
  return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
    this.router.navigate(['dashboard']);
  });
}

// Auth logic to run auth providers
AuthLogin(provider: any) {
  return this.afAuth
    .signInWithPopup(provider)
    .then((result) => {
      this.router.navigate(['dashboard']);

      //this.SetUserData(result.user);
    })
    .catch((error) => {
      window.alert(error);
    });
}


  //get current user

  async getCurrentUser(): Promise<firebase.User | null> {
    return this.afAuth.currentUser;
  }
}
