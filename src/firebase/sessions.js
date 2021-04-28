import { auth, firestore, storage, functions } from './firebase';
import firebase from 'firebase/app';
import ACCOUNT_STATUS from '../constants/account-status';

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
    const status = ACCOUNT_STATUS.Pending;

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        adminAccount,
        status,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

const uploadFile = async (pathname, file) => {
  return new Promise((resolve, reject) => {
    storage
      .child(pathname)
      .put(file)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          resolve(url);
        });
      })
      .catch(() => {
        reject();
      });
  });
};

export const signUp = async (params) => {
  const { email, password, displayName, phoneNumber } = params;
  return new Promise((resolve, reject) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user.sendEmailVerification();
        createUserProfileDocument(user, {
          displayName,
          phoneNumber,
          orgAccount: false,
        });
        auth.signOut();
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

export const signUpOrg = async (params) => {
  const {
    email,
    password,
    displayName,
    phoneNumber,
    orgName,
    orgType,
    description,
    orgLogo,
  } = params;
  return new Promise((resolve, reject) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user.sendEmailVerification();

        const sendNewUserEmail = functions.httpsCallable('sendNewUserEmail');
        sendNewUserEmail({
          name: displayName,
          org: orgName,
          email,
        });

        uploadFile(user.uid + '/logo.jpeg', orgLogo).then((url) => {
          createUserProfileDocument(user, {
            displayName,
            phoneNumber,
            orgName,
            orgType,
            description,
            logo: url,
            orgAccount: true,
          });
          auth.signOut();
          resolve();
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
            errorMssg = 'No existe una cuenta para este correo.';
            break;
          default:
            errorMssg = 'Error de inicio de sesión';
            break;
        }
        reject(errorMssg);
      });
  });
};

export const updateOrg = async (data, id) => {
  return new Promise((resolve, reject) => {
    if (data.newOrgLogo) {
      uploadFile(id + '/logo.jpeg', data.newOrgLogo).then((url) => {
        firestore
          .collection('users')
          .doc(id)
          .update({
            orgName: data.orgName,
            orgType: data.orgType,
            description: data.description,
            logo: url,
          })
          .then(() => {
            resolve(url);
          })
          .catch(() => {
            reject();
          });
      });
    } else {
      firestore
        .collection('users')
        .doc(id)
        .update({
          orgName: data.orgName,
          orgType: data.orgType,
          description: data.description,
        })
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    }
  });
};

export const makePending = async (id) => {
  firestore
    .collection('users')
    .doc(id)
    .set({ status: ACCOUNT_STATUS.Pending }, { merge: true })
    .then(() => {
      console.log('Document succesffully updated!');
    })
    .catch((err) => {
      console.log('There was an error!', err);
    });
};

export const changePass = async (oldPass, newPass) => {
  return new Promise((resolve, reject) => {
    const credential = firebase.auth.EmailAuthProvider.credential(
      auth.currentUser.email,
      oldPass,
    );
    auth.currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        auth.currentUser
          .updatePassword(newPass)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            console.log(error);
            reject('Error de inicio de sesión.');
          });
      })
      .catch((error) => {
        console.log(error);
        var errMssg;
        switch (error.code) {
          case 'auth/wrong-password':
            errMssg = 'La contraseña anterior es incorrecta.';
            break;
          default:
            errMssg = 'Error de inicio de sesión.';
            break;
        }
        reject(errMssg);
      });
  });
};
