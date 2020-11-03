exports.makeContactEmailHTML = function (
  name,
  fromEmail,
  service,
  message,
  org,
) {
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
  `;
};

exports.makeNewUserEmailHTML = function (name, org, email) {
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
  `;
};

exports.makeNewSolutionEmailHTML = function (name, org) {
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
  `;
};

exports.makeUserApprovedEmailHTML = function (name, org, email) {
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
  `;
};

exports.makeUserRejectedEmailHTML = function (name, org, email, message) {
  return `
    <h3>Buen día ${name},</h3>
    <p>
      Tu solicitud para registrar la organización <b>${org}</b> con el usuario 
      <b>${email}</b> en el <b> Catálogo de Soluciones Digitales CSOFTMTY</b> 
      ha sido rechazada. Te invitamos a <a href='catalogo-soluciones.web.app'>
      acceder al sistema</a> para comenzar a agregar soluciones.
    </p>
    <p>
      Por <a href='catalogo-soluciones.web.app'>ingresa al sistema</a> para 
      registrarte nuevamente, siguiende las siguientes indicaciones.
    </p>
    <p>${message}</p>
  `;
};

exports.makeSolutionApprovedEmailHTML = function (name, org, solutionName) {
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
  `;
};

exports.makeSolutionRejectedEmailHTML = function (
  name,
  org,
  solutionName,
  message,
) {
  return `
    <h3>Buen día ${name},</h3>
    <p>
      Tu solicitud para registrar la solución <b>${solutionName}</b> de la 
      organización <b>${org}</b> en el <b> Catálogo de Soluciones Digitales 
      CSOFTMTY</b> ha sido rechazada. Te invitamos a 
      <a href='catalogo-soluciones.web.app'>acceder al sistema</a> para hacer
      las siguientes correcciones que se solicitan.
    </p>
    <p>${message}</p>
  `;
};
