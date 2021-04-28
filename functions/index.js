const firebase = require('firebase-admin');
const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });

const templates = require('./util/email_templates');

const { transporter } = require('./util/email_credentials');

firebase.initializeApp();

exports.sendContactEmail = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const body = request.body.data;
    const html = templates.makeContactEmailHTML(
      body.name,
      body.fromEmail,
      body.service,
      body.message,
      body.org,
    );
    transporter.sendMail(
      {
        from: 'Catálogo de Soluciones Digitales',
        to: body.toEmail,
        cc: 'comunicacion@csoftmty.org',
        subject: 'Consulta del Catálogo de Soluciones Digitales',
        html: html,
      },
      (error) => {
        if (error) {
          functions.logger.log(error);
          response.status(500).send(error);
        } else {
          response.send({ data: 'success' });
        }
      },
    );
  });
});

exports.sendCustomInquiry = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const body = request.body.data;
    const html = templates.makeCustomInquiryEmailHTML(
      body.contact,
      body.general,
      body.detail,
      body.status,
    );
    transporter.sendMail(
      {
        from: 'Catálogo de Soluciones Digitales',
        to: 'comunicacion@csoftmty.org',
        cc: body.contact.email,
        subject: 'Consulta personalizada del Catálogo de Soluciones Digitales',
        html: html,
      },
      (error) => {
        if (error) {
          functions.logger.log(error);
          response.status(500).send(error);
        } else {
          response.send({ data: 'success' });
        }
      },
    );
  });
});

exports.sendNewUserEmail = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const body = request.body.data;
    const html = templates.makeNewUserEmailHTML(
      body.name,
      body.org,
      body.email,
    );
    transporter.sendMail(
      {
        from: 'Catálogo de Soluciones Digitales',
        to: 'comunicacion@csoftmty.org',
        subject: 'Nuevo Usuario en Catálogo de Soluciones Digitales CSOFTMTY',
        html: html,
      },
      (error) => {
        if (error) {
          functions.logger.log(error);
          response.status(500).send(error);
        } else {
          response.send({ data: 'success' });
        }
      },
    );
  });
});

exports.sendNewSolutionEmail = functions.https.onRequest(
  (request, response) => {
    cors(request, response, () => {
      const body = request.body.data;
      const html = templates.makeNewSolutionEmailHTML(body.name, body.org);
      transporter.sendMail(
        {
          from: 'Catálogo de Soluciones Digitales',
          to: 'comunicacion@csoftmty.org',
          subject:
            'Nueva Solución en Catálogo de Soluciones Digitales CSOFTMTY',
          html: html,
        },
        (error) => {
          if (error) {
            functions.logger.log(error);
            response.status(500).send(error);
          } else {
            response.send({ data: 'success' });
          }
        },
      );
    });
  },
);

exports.sendUserApprovedEmail = functions.https.onRequest(
  (request, response) => {
    cors(request, response, () => {
      const body = request.body.data;
      const html = templates.makeUserApprovedEmailHTML(
        body.name,
        body.org,
        body.email,
      );
      transporter.sendMail(
        {
          from: 'Catálogo de Soluciones Digitales',
          to: body.email,
          subject:
            'Tu cuenta ha sido aprobada en el Catálogo de Soluciones Digitales CSOFTMTY',
          html: html,
        },
        (error) => {
          if (error) {
            functions.logger.log(error);
            response.status(500).send(error);
          } else {
            response.send({ data: 'success' });
          }
        },
      );
    });
  },
);

exports.sendUserRejectedEmail = functions.https.onRequest(
  (request, response) => {
    cors(request, response, () => {
      const body = request.body.data;
      const html = templates.makeUserRejectedEmailHTML(
        body.name,
        body.org,
        body.email,
        body.message,
      );
      transporter.sendMail(
        {
          from: 'Catálogo de Soluciones Digitales',
          to: body.email,
          subject:
            'Tu cuenta ha sido rechazada en el Catálogo de Soluciones Digitales CSOFTMTY',
          html: html,
        },
        (error) => {
          if (error) {
            functions.logger.log(error);
            response.status(500).send(error);
          } else {
            response.send({ data: 'success' });
          }
        },
      );
    });
  },
);

exports.sendSolutionApprovedEmail = functions.https.onRequest(
  (request, response) => {
    cors(request, response, () => {
      const body = request.body.data;
      const html = templates.makeSolutionApprovedEmailHTML(
        body.org,
        body.solutionName,
      );
      transporter.sendMail(
        {
          from: 'Catálogo de Soluciones Digitales',
          to: body.email,
          subject:
            'Tu solución ha sido aprobada en el Catálogo de Soluciones Digitales CSOFTMTY',
          html: html,
        },
        (error) => {
          if (error) {
            functions.logger.log(error);
            response.status(500).send(error);
          } else {
            response.send({ data: 'success' });
          }
        },
      );
    });
  },
);

exports.sendSolutionRejectedEmail = functions.https.onRequest(
  (request, response) => {
    cors(request, response, () => {
      const body = request.body.data;
      const html = templates.makeSolutionRejectedEmailHTML(
        body.org,
        body.solutionName,
        body.message,
      );
      transporter.sendMail(
        {
          from: 'Catálogo de Soluciones Digitales',
          to: body.email,
          subject:
            'Tu solución ha sido rechazada en el Catálogo de Soluciones Digitales CSOFTMTY',
          html: html,
        },
        (error) => {
          if (error) {
            functions.logger.log(error);
            response.status(400).send(error);
          } else {
            response.send({ data: 'success' });
          }
        },
      );
    });
  },
);
