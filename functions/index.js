const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });

const { transporter } = require('./util/email_credentials');

const makeContactEmailHTML = function (name, fromEmail, service, message, org) {
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
    const html = makeContactEmailHTML(body.name, body.fromEmail, body.service,
      body.message, body.org);
    transporter.sendMail({
      from: 'Catálogo de Soluciones Digitales',
      to: body.toEmail,
      // TODO: reemplazar por email CSOFTMTY.
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

const makeNewUserEmailHTML = function (name, org, email) {
  return `
    <h3>Buen día Administrador,</h3>
    <p>
      El <b>Catálogo de Soluciones Digitales CSOFTMTY</b> ha recibido un nuevo
      registro. Se ha registrado <b>${name}</b> como administrador de la 
      organización <b>${org}</b> con correo <a href="mailto:${email}">
      ${email}</a>. Porfavor ingresa al sistema para validar su registro.
    </p>
    <p>
      Gracias, buen día.
    </p>
  `
}

exports.sendNewUserEmail = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const body = request.body.data;
    const html = makeNewUserEmailHTML(body.name, body.org, body.email);
    transporter.sendMail({
      from: 'Catálogo de Soluciones Digitales',
      // TODO: reemplazar por email CSOFTMTY.
      to: 'mauriciogm97@hotmail.com',
      subject: 'Nuevo Usuario en Catálogo de Soluciones Digitales CSOFTMTY',
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

const makeNewSolutionEmailHTML = function (name, org) {
  return `
    <h3>Buen día Administrador,</h3>
    <p>
      El <b>Catálogo de Soluciones Digitales CSOFTMTY</b> ha recibido un nuevo
      registro de solución. La organización <b>${org}</b> ha registrado el
      servicio <b>${name}</b>. Por favor ingresa al sistema para validar el
      registro.
    </p>
    <p>
      Gracias, buen día.
    </p>
  `
}

exports.sendNewSolutionEmail = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const body = request.body.data;
    const html = makeNewSolutionEmailHTML(body.name, body.org);
    transporter.sendMail({
      from: 'Catálogo de Soluciones Digitales',
      // TODO: reemplazar por email CSOFTMTY.
      to: 'mauriciogm97@hotmail.com',
      subject: 'Nueva Solución en Catálogo de Soluciones Digitales CSOFTMTY',
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

const makeUserApprovedEmailHTML = function(name, org, email) {
  return `
    <h3>Buen día ${name},</h3>
    <p>
      Tu solicitud para registrar la organización <b>${org}</b> con el usuario 
      <b>${email}</b> en el <b> Catálogo de Soluciones Digitales CSOFTMTY</b> 
      ha sido aprobada. Te invitamos a <a href='catalogo-soluciones.web.app'>
      acceder al sistema</a> para comenzar a agregar soluciones.
    </p>
    <p>
      Gracias, buen día.
    </p>
  `
}

exports.userApprovedEmail = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const body = request.body.data;
    const html = makeUserApprovedEmailHTML(body.name, body.org, body.email);
    transporter.sendMail({
      from: 'Catálogo de Soluciones Digitales',
      to: body.email,
      subject: 'Tu cuenta ha sido aprobada en el Catálogo de Soluciones Digitales CSOFTMTY',
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

const makeSolutionApprovedEmailHTML = function(name, org, solutionName) {
  return `
    <h3>Buen día ${name},</h3>
    <p>
      Tu solicitud para registrar la solución <b>${solutionName}</b> de la 
      organización <b>${org}</b> en el <b> Catálogo de Soluciones Digitales 
      CSOFTMTY</b> ha sido aprobada. Te invitamos a <a 
      href='catalogo-soluciones.web.app/catalogo'>acceder al catálogo</a> para
      ver tu solución.
    </p>
    <p>
      Gracias, buen día.
    </p>
  `
}

exports.userApprovedEmail = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const body = request.body.data;
    const html = makeSolutionApprovedEmailHTML(body.name, body.org, 
      body.solutionName);
    transporter.sendMail({
      from: 'Catálogo de Soluciones Digitales',
      to: body.email,
      subject: 'Tu solución ha sido aprobada en el Catálogo de Soluciones Digitales CSOFTMTY',
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