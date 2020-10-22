import { auth, firestore, storage } from './firebase';

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

export const signUp = async (email, password, displayName, phoneNumber, orgName,
  orgType, description, orgLogo) => {
  return new Promise((resolve, reject) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user.sendEmailVerification();

        storage.child(user.uid + '/logo.jpeg').put(orgLogo)
          .then((snapshot) => {
            snapshot.ref.getDownloadURL().then((url) => {
              createUserProfileDocument(user, {
                displayName, phoneNumber, orgName,
                orgType, description, logo: url
              });
              auth.signOut();
              resolve();
            });
          });
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
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        if (auth.currentUser.emailVerified) {
          resolve();
        } else {
          auth.currentUser.sendEmailVerification();
          reject(
            'Se debe verificar la cuenta desde el correo electrónico de verificación. Hemos enviado el correo nuevamente.',
          );
        }
      })
      .catch((error) => {
        console.log(error);
        var errorMssg;
        switch (error.code) {
          case 'auth/wrong-password':
            errorMssg = 'La contraseña proporcionada es incorrecta.';
            break;
          case 'auth/user-not-found':
            errorMssg = 'No existe una cuenta para este correo.'
            break;
          default:
            errorMssg = 'Error de inicio de sesión';
            break;
        }
        reject(errorMssg);
      });
  });
};
