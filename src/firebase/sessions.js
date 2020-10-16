import { auth, firestore } from './firebase';

export const getUserRef = async (userAuth) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  return userRef;
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const adminAccount = false;

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        adminAccount,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const signUp = async (email, password, displayName, phoneNumber) => {
  return new Promise((resolve, reject) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user.sendEmailVerification();
        createUserProfileDocument(user, { displayName, phoneNumber });
        resolve();
      })
      .catch((error) => {
        console.log(error);
        var errorMssg = 'Error al registrar al usuario.';
        if (error.code === 'auth/email-already-in-use') {
          errorMssg = 'Ya existe una cuenta para este correo electrónico.';
        }
        reject(errorMssg);
      });
  });
};

export const signIn = async (email, password) => {
  return new Promise((resolve, reject) => {
    auth.signInWithEmailAndPassword(email, password).then(() => {
      if (auth.currentUser.emailVerified) {
        resolve();
      } else {
        reject('Se debe verificar la cuenta desde el correo electrónico de verificación.');
      }
    }).catch((error) => {
      console.log(error);
      var errorMssg = 'Error de inicio de sesión.';
      if (error.code === 'auth/wrong-password') {
        errorMssg = 'La contraseña proporcionada es incorrecta.';
      }
      reject(errorMssg);
    });
  });
}