const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });

const { transporter } = require('./util/email_credentials');

const makeContactMailHTML = function (name, fromEmail, service, message, org) {
  return `
    <h3>Buen día,</h3>
    <p>
      Su servicio <b>${service}</b> ha recibido una consulta en el <b>Catálogo 
      de Soluciones Digitales CSOFTMTY</b>.
    </p>
    <p>
      Para dar seguimiento, favor de contactar a ${name}, de la organización 
      ${org} en el correo <a href="mailto:${fromEmail}">${fromEmail}</a>. Favor
      de incluir el correo <a href="mailto:contacto@csoftmty.com">
      contacto@csoftmty.com</a> con copia.
    </p>
    <p>El mensaje recibido es el siguiente:</p>
    <p>${message}</p>
  `
}

exports.sendContactEmail = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const body = request.body.data;
    const html = makeContactMailHTML(body.name, body.fromEmail, body.service,
      body.message, body.org);
    functions.logger.log(html)
    transporter.sendMail({
      from: 'Catálogo de Soluciones Digitales',
      to: body.toEmail,
      cc: 'mauriciogm97@hotmail.com',
      subject: 'Consulta del Catálogo de Soluciones Digitales',
      html: html,
    }, (error) => {
      if (error) {
        functions.logger.log(error);
        response.status(500).send(error);
      } else {
        response.send({data: 'success'});
      }
    });
  });  
});
