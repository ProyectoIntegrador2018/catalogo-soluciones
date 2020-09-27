const functions = require('firebase-functions');
const { transport } = require('./email_credentials');

exports.sendEmail = functions.https.onRequest((request, response) => {
  // TODO(mauriciogm97): Por seguridad no recibir los emails del frontend.
  // Por seguridad crear templates del texto en backend.
  transport.sendMail({
    from: 'Catálogo de Soluciones Digitales',
    to: request.email,
    subject: request.subject,
    text: request.text,
  });
  response.send({});
});
