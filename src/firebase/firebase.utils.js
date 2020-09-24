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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promps: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
