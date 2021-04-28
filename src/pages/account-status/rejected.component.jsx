import React from 'react';
import { Warning } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { makePending } from '../../firebase/sessions';
import { useHistory } from 'react-router-dom';

const Rejected = ({ currentUser }) => {
  const history = useHistory();
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
        <Button
          style={{ border: '1px solid gray' }}
          onClick={() => {
            makePending(currentUser.id);
            history.push('/pending');
          }}
        >
          {' '}
          Volver a pedir que me acepten{' '}
        </Button>
      </span>
    </div>
  );
};

export default Rejected;
