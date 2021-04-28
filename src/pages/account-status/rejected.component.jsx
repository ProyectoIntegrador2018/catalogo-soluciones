import React from 'react';
import { Warning } from '@material-ui/icons';

const Rejected = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>
        Tu cuenta ha sido rechazada por <b>Csoft</b> :(
      </h1>
      <Warning />
      <br />
      <span>
        No podrás acceder a los servicios de la plataforma sin antes tener
        aprobación del administrador.
      </span>
      <br />
      <span>
        Si crees que hubo un error, manda un correo a{' '}
        <b>comunicacion@csoftmty.org</b>
      </span>
    </div>
  );
};

export default Rejected;
