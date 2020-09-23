const admin = require('firebase-admin');
const firebase = admin.initializeApp();

const auth = firebase.auth();

const actionCodeSettings = {
  url: 'https://catalogo-soluciones.web.app/verify',
};

module.exports = {
  auth,
  actionCodeSettings,
};
