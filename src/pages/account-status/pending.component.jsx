import React from 'react';
import { Timer } from '@material-ui/icons';

const Pending = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>
        Tu cuenta aún no ha sido aprobada por <b>Csoft</b>
      </h1>
      <Timer />
      <br />
      <span>
        No podrás acceder a los servicios de la plataforma sin antes tener
        aprobación del administrador.
      </span>
      <br />
      Si crees que se están tardando mucho en aprobarla, manda un correo a{' '}
      <b>comunicacion@csoftmty.org</b>
    </div>
  );
};

export default Pending;
