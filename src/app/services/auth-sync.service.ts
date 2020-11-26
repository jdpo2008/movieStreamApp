import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserCredential } from '@firebase/auth-types';
import { AuthProvider } from '../enums';

export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

export interface ICredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthProcessService {
  onSuccessEmitter: EventEmitter<User> = new EventEmitter<User>();
  onErrorEmitter: EventEmitter<any> = new EventEmitter<any>();

  private _user$ = new BehaviorSubject<User | null>(null);
  get user$(): Observable<User | null> {
    return this._user$.asObservable();
  }
  user: User;
  constructor(public afa: AngularFireAuth) {}

  listenToUserEvents() {
    this.afa.user.subscribe((user: User | null) => {
      this._user$.next(user);
      this.user = user;
    });
  }

  public async resetPassword(email: string): Promise<void> {
    try {
      console.log('Password reset email sent');
      return await this.afa.sendPasswordResetEmail(email);
    } catch (error) {
      //return this.notifyError(error);
    }
  }

  public async changePassword(password: string): Promise<void> {
    try {
      return await (await this.afa.currentUser).updatePassword(password);
    } catch (error) {
      //return this.notifyError(error);
    }
  }

  public async signInWith(provider: AuthProvider, credentials?: ICredentials) {
    try {
      let signInResult: UserCredential | any;
      switch (provider) {
        case AuthProvider.EmailAndPassword:
          signInResult = (await this.afa.signInWithEmailAndPassword(
            credentials.email,
            credentials.password
          )) as UserCredential;
          break;

        case AuthProvider.Google:
          signInResult = (await this.afa.signInWithPopup(
            googleAuthProvider
          )) as UserCredential;
          break;

        case AuthProvider.Facebook:
          signInResult = (await this.afa.signInWithPopup(
            facebookAuthProvider
          )) as UserCredential;
          break;

        case AuthProvider.Twitter:
          signInResult = (await this.afa.signInWithPopup(
            twitterAuthProvider
          )) as UserCredential;
          break;

        default:
          throw new Error(
            `${AuthProvider[provider]} is not available as auth provider`
          );
      }
      //await this.handleSuccess(signInResult);
    } catch (err) {
      //this.notifyError(err);
    }
  }

  async handleSuccess(userCredential: UserCredential) {
    this.onSuccessEmitter.next(userCredential.user);
    try {
      //await this.fireStoreService.updateUserData(
      //this.parseUserInfo(userCredential.user)
      //);
    } catch (e) {
      console.error(
        `Error ocurrido mientras se actualizaban los datos del usuario con firestore: ${e}`
      );
    }
    const fallbackMessage = `Bienvenido ${
      userCredential.user.displayName ? userCredential.user.displayName : ''
    }`;
    //this.showSuccesToast(fallbackMessage);
  }
}
