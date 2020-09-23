const { auth, actionCodeSettings } = require('../firebase');
const emailer = require('./email');

function signUp(req, res) {
  const body = req.body;
  auth
    .createUser({
      email: body.email,
      password: body.password,
      emailVerified: false,
    })
    .then(function (userRecord) {
      // Almacenar id de usuario y resto de los datos en base de datos.
      auth
        .generateEmailVerificationLink(body.email, actionCodeSettings)
        .then(function (link) {
          emailer
            .sendVerificationEmail(body.name, body.email, link)
            .then(function (_) {
              return res.send({ id: userRecord.uid });
            })
            .catch(function (err) {
              res.status(500).send({ err: err });
            });
        })
        .catch(function (err) {
          res.status(400).send({ err: err.Code });
        });
    })
    .catch(function (err) {
      const errCode = err.code;
      var errMssg;
      switch (errCode) {
        case 'auth/email-already-exists':
          errMssg =
            'Ya hay una cuenta registrada para el correo proporcionado.';
          break;
        case 'auth/invalid-email':
          errMssg = 'El correo electrónico proporcionado no es válido.';
          break;
        default:
          errMssg = 'Error de inicio de sesión.';
          break;
      }
      return res.status(400).send({ errCode: errCode, errMssg: errMssg });
    });
}

module.exports = {
  signUp,
};
