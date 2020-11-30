
import { Accounts } from './../enums/accounts.enum';
import { EventEmitter, Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { BehaviorSubject, Observable } from "rxjs";
import { User, UserCredential } from "@firebase/auth-types";
import { map, take } from "rxjs/operators";

import { AuthProvider } from '../enums';
import { FirestoreSyncService } from './firestore-sync.service';

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
    constructor(public afa: AngularFireAuth, public fireStoreService: FirestoreSyncService) {
    }

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
        await this.handleSuccess(signInResult);
      } catch (err) {
        //this.notifyError(err);
      }
    }

    public async signUp(displayName: string, credentials: ICredentials) {
      try {
        const userCredential: UserCredential = await this.afa.createUserWithEmailAndPassword(
          credentials.email,
          credentials.password
        );
        const user = userCredential.user;
        await this.updateProfile(displayName, user.photoURL);
  
        await this.fireStoreService.getUserDocRefByUID(user.uid).set({
          uid: user.uid,
          displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          providerId:
            user.providerData.length > 0
              ? user.providerData[0].providerId
              : null,
        } as User);

        await this.sendNewVerificationEmail();
  
        await this.handleSuccess(userCredential);
      } catch (err) {
        //this.notifyError(err);
      }
    }

    public async sendNewVerificationEmail(): Promise<void | never> {
      if (!this.user) {
        return Promise.reject(new Error("No signed in user"));
      }
      return this.user.sendEmailVerification();
    }

    public async signOut() {
      try {
        await this.afa.signOut();
      } catch (error) {
        //this.notifyError(error);
      }
    }
      
    async handleSuccess(userCredential: UserCredential) {
        this.onSuccessEmitter.next(userCredential.user);
        try {
            await this.fireStoreService.updateUserData(
            this.parseUserInfo(userCredential.user)
          );
        } catch (e) {
          console.error(
            `Error ocurrido mientras se actualizaban los datos del usuario con firestore: ${e}`
          );
        }
        const fallbackMessage = `Bienvenido ${
        userCredential.user.displayName ? userCredential.user.displayName : "" }`
        //this.showSuccesToast(fallbackMessage);
        
    }

    public reloadUserInfo() {
      return this._user$
        .pipe(take(1))
        .subscribe((user: User | null) => user && user.reload());
    }
    
    public updateProfile(name: string, photoURL: string): Promise<void> {
      return this.afa.currentUser.then((user: User) => {
        if (!photoURL) {
          return user.updateProfile({ displayName: name });
        } else {
          return user.updateProfile({ displayName: name, photoURL });
        }
      });
    }
    
    public parseUserInfo(user: User): any {
      return {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        providerId:
          user.providerData.length > 0 ? user.providerData[0].providerId : null,
      };
    }

    public getUserPhotoUrl(): Observable<string | null> {
      return this._user$.pipe(
        map((user: User | null) => {
          if (!user) {
            return null;
          } else if (user.photoURL) {
            return user.photoURL;
          } else if (user.emailVerified) {
            return this.getPhotoPath(Accounts.CHECK);
          } else if (user.isAnonymous) {
            return this.getPhotoPath(Accounts.OFF);
          } else {
            return this.getPhotoPath(Accounts.NONE);
          }
        })
      );
    }
  
    public getPhotoPath(image: string): string {
      return `assets/images/user/${image}.svg`;
    }
}
