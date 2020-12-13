import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import '@firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserCredential } from '@firebase/auth-types';
import { map, take } from 'rxjs/operators';

import { Accounts } from './../enums/accounts.enum';
import { AuthProvider } from '../enums';
import { FirestoreSyncService } from './firestore-sync.service';
import { ToastService } from './toast.service';
import { 
  ICredentials, 
  googleAuthProvider, 
  facebookAuthProvider, 
  twitterAuthProvider 
} from '../shared/interfaces/auth.inetrafce';

@Injectable({
  providedIn: 'root',
})
export class AuthProcessService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private isLoadingSubject: BehaviorSubject<boolean>;

  onSuccessEmitter: EventEmitter<User> = new EventEmitter<User>();
  onErrorEmitter: EventEmitter<any> = new EventEmitter<any>();
  user: User;

  get user$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  get loading$(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  }
 
  constructor(
    private router: Router,
    public afa: AngularFireAuth,
    public fireStoreService: FirestoreSyncService,
    public toastService: ToastService
  ) {}

  listenToUserEvents() {
    this.afa.user.subscribe((user: User | null) => {
      this.userSubject.next(user);
      this.user = user;
    });
  }

  public async resetPassword(email: string): Promise<void> {
    try {
      console.log('Password reset email sent');
      return await this.afa.sendPasswordResetEmail(email);
    } catch (error) {
      return this.notifyError(this.getErrorMessageAuth(error));
    }
  }

  public async changePassword(password: string): Promise<void> {
    try {
      return await (await this.afa.currentUser).updatePassword(password);
    } catch (error) {
      return this.notifyError(this.getErrorMessageAuth(error));
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
      console.log(err);
      this.notifyError(this.getErrorMessageAuth(err));
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
          user.providerData.length > 0 ? user.providerData[0].providerId : null,
      } as User);

      await this.sendNewVerificationEmail();

      await this.handleSuccess(userCredential);
    } catch (err) {
      this.notifyError(this.getErrorMessageAuth(err));
    }
  }

  public async sendNewVerificationEmail(): Promise<void | never> {
    if (!this.user) {
      return Promise.reject(new Error('No signed in user'));
    }
    return this.user.sendEmailVerification();
  }

  public async signOut() {
    try {
      await this.afa.signOut();

      this.router.navigate([`main/auth/login`]);
    } catch (error) {
      this.notifyError(error.message);
    }
  }

  async handleSuccess(userCredential: UserCredential) {
    this.onSuccessEmitter.next(userCredential.user);
    let accessToken = userCredential.user.getIdToken(false);
    console.log(accessToken);
    if (!userCredential.user.emailVerified) {
      this.toastService.setMessage({
        icon: 'warning',
        title: 'Información',
        text: 'Debes confirmar tu dirección de Correo electronico',
        timer: 3000,
      });
      return;
    }

    try {
      await this.fireStoreService.updateUserData(
        this.parseUserInfo(userCredential.user)
      );
    } catch (e) {
      console.error(
        `Error ocurrido mientras se actualizaban los datos del usuario con firestore: ${e}`
      );
    }
    this.router.navigate([`pages/dashboard`]);

    const fallbackMessage = `${
      userCredential.user.displayName ? userCredential.user.displayName : ''
    }`;

    this.toastService.setMessage({
      icon: 'success',
      title: 'Bienvenido',
      text: fallbackMessage,
      timer: 3000,
    });
  }

  public reloadUserInfo() {
    return this.userSubject
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
    return this.userSubject.pipe(
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

  public getIdToken() {
    return this.afa.user;
  }

  private notifyError(message: string) {
    this.toastService.setMessage({
      icon: 'error',
      title: 'Lo Siento!',
      text: message,
      timer: 3000,
    });
  }

  private getErrorMessageAuth(error: any): string {
    let message = '';
    switch (error.code) {
      case 'auth/invalid-email':
        message = 'Debe ingresar un correo valido';
        break;
      case 'auth/user-disabled':
        message = 'El usuario se encuentra deshabilitado';
        break;
      case 'auth/user-not-found':
        message = 'El Correo y/o la contraseña no son validos';
        break;
      case 'auth/wrong-password':
        message = 'El Correo y/o la contraseña no son validos';
        break;
      //Errores en Registro
      case 'auth/email-already-in-use':
        message = 'El Correo ya se encuentra en uso';
        break;
      case 'auth/operation-not-allowed':
        message = 'La cuenta no se encuentra habilitada en Firebase';
        break;
      case 'auth/weak-password':
        message = 'La contraseña no es lo suficientemente segura';
        break;
      default:
        message = 'Codigo de error no encontrado';
    }

    return message;
  }
}
