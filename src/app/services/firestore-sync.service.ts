import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { UserInfo } from "@firebase/auth-types";
import * as firebase from "firebase";
//import { firebase } from "@firebase/app";
import { Observable } from "rxjs/internal/observable";
import { map } from "rxjs/operators";

export const collections = {
  users: "users"
};

export type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
export type DocumentPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable({
  providedIn: "root",
})
export class FirestoreSyncService {
  
  constructor(public afs: AngularFirestore) {
    //this.afs.firestore.settings({ timestampsInSnapshots: true });
  }

  col<T>(ref: CollectionPredicate<T>, queryFn?): AngularFirestoreCollection<T> {
    return typeof ref === "string" ? this.afs.collection<T>(ref, queryFn) : ref;
  }

  doc<T>(ref: DocumentPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === "string" ? this.afs.doc<T>(ref) : ref;
  }

  doc$<T>(ref: DocumentPredicate<T>): Observable<T> {
    return this.doc(ref)
      .snapshotChanges()
      .pipe(
        map((doc) => {
          return doc.payload.data() as T;
        })
      );
  }

  col$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.col(ref, queryFn)
      .snapshotChanges()
      .pipe(
        map((docs) => {
          return docs.map((a) => a.payload.doc.data()) as T[];
        })
      );
  }

  colWithId$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.col(ref, queryFn)
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  get timestamp() {
    return firebase.default.firestore.FieldValue.serverTimestamp;
  }

  set<T>(ref: DocumentPredicate<T>, data: any) {
    const timestamp = this.timestamp;
    return this.doc(ref).set({
      ...data,
      updateAt: null,
      createdAt: timestamp,
    });
  }

  update<T>(ref: CollectionPredicate<T>, key: string, data: any) {
    const timestamp = this.timestamp;
    const refDocument = this.doc<T>(`${ref}/${key}`);
    return this.doc<T>(refDocument).set(
      {
        ...data,
        updateAt: timestamp,
      },
      { merge: true }
    );
  }

  public getUserDocRefByUID(uid: string): AngularFirestoreDocument<UserInfo> {
    return this.doc(`${collections.users}/${uid}`);
  }

  public deleteUserData(uid: string): Promise<any> {
    const userRef: AngularFirestoreDocument<UserInfo> = this.getUserDocRefByUID(
      uid
    );
    return userRef.delete();
  }

  public updateUserData(user: any): Promise<any> {
    const userRef: AngularFirestoreDocument<any> = this.getUserDocRefByUID(
      user.uid
    );
    const data: any = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      providerId: user.providerId,
      updateAt: this.timestamp,
    };
    return userRef.set(data, { merge: true });
  }

}
