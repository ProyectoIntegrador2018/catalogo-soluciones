const nodemailer = require('nodemailer');
const { transporter } = require('../config/email');

function sendEmail(email, subject, html) {
  return transporter.sendMail({
    from: 'Catálogo de Soluciones Digitales CSOFTMTY',
    to: email,
    subject: subject,
    html: html,
  });
}

function sendVerificationEmail(name, email, link) {
  const subject =
    'Verifica tu Cuenta del Catálogo de Solciones Digitales' + 'CSOFTMTY';
  const html =
    '<p>Hola ' +
    name +
    '.</p>' +
    '<p>Haz click <a href="' +
    link +
    '">AQUI</a> para verificar tu cuenta' +
    ' del Catálogo de Soluciones Digitales CSOFTMTY.</p>';
  return sendEmail(email, subject, html);
}

module.exports = {
  sendVerificationEmail,
};
