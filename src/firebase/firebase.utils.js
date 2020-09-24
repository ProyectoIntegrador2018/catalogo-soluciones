import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Don't push this.
const firebaseConfig = {
  apiKey: 'AIzaSyBfH3dfjZb9iWm5wmkOpwk7jexk_4xJZAc',
  authDomain: 'catalogo-soluciones.firebaseapp.com',
  databaseURL: 'https://catalogo-soluciones.firebaseio.com',
  projectId: 'catalogo-soluciones',
  storageBucket: 'catalogo-soluciones.appspot.com',
  messagingSenderId: '664658596506',
  appId: '1:664658596506:web:977d1b9ffc279546558523',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promps: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
