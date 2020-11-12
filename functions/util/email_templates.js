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
      ha sido rechazada.
    </p>
    <p>
      Por favor <a href='catalogo-soluciones.web.app'>ingresa al sistema</a> 
      para registrarte nuevamente, siguiende las siguientes indicaciones.
    </p>
    <p>${message}</p>
  `;
};

exports.makeSolutionApprovedEmailHTML = function (org, solutionName) {
  return `
    <h3>Buen día,</h3>
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
  org,
  solutionName,
  message,
) {
  return `
    <h3>Buen día,</h3>
    <p>
      Tu solicitud para registrar la solución <b>${solutionName}</b> de la 
      organización <b>${org}</b> en el <b> Catálogo de Soluciones Digitales 
      CSOFTMTY</b> ha sido rechazada. Te invitamos a 
      <a href='catalogo-soluciones.web.app'>acceder al sistema</a> para 
      registrar nuevamente la solución tomando en cuenta las siguientes 
      indicaciones:
    </p>
    <p>${message}</p>
  `;
};

exports.makeCustomInquiryEmailHTML = function (
  contact,
  general,
  detail,
  status,
) {
  return `
    <p>Buen día,</p>
    <p>
      Se ha recibido la siguiente consulta personalizada:

      <h3>Datos de Contacto</h3>
      <p><b>Nombre de la persona:</b> ${contact.name}</p>
      <p><b>Nombre de la organización:</b> ${contact.org}</p>
      <p><b>Posición</b>: ${contact.position}</p>
      <p><b>Teléfono:</b> ${contact.phone}</p>
      <p><b>Correo electrónico:</b> ${contact.email}</p>

      <h3>General</h3>
      <p><b>Nombre de la necesidad:</b> ${general.name}</p>
      <p><b>Objetivo:</b> ${general.objective}</p>
      <p><b>Fechas relevantes:</b> ${general.dates}</p>
      <p><b>Antecedentes:</b> ${general.background}</p>

      <h3>Detalle</h3>
      <p><b>Descripción de la necesidad:</b> ${detail.description}</p>
      <p><b>Listado de requerimientos:</b> ${detail.optionalRequirements}</p>
      <p><b>Requerimientos obligatorios:</b> ${detail.requirements}</p>

      <h3>Estatus de la necesidad</h3>
      <p><b>¿Aprobado por área usuaria?</b> ${status.isUserApproved}</p>
      <p><b>¿Aprobado por área IT?</b> ${status.isITApproved}</p>
      <p><b>¿Presupuesto asignado?</b> ${status.hasBudget}</p>
      <p><b>Tipo de proyecto:</b> ${status.projectType}</p>
      <p><b>Comentarios adicionales:</b> ${status.comments}</p>
    </p>
  `;
};
