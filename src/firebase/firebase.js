import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/functions';
import { firebaseConfig } from './firebase.config';

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage().ref();
const functions = firebase.functions();

if (process.env.NODE_ENV === 'development') {
  functions.useEmulator('localhost', 5001);
}

export { auth, firestore, storage, functions };

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promps: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
