import { firebase } from '@firebase/app';

export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

export interface ICredentials {
  email: string;
  password: string;
}