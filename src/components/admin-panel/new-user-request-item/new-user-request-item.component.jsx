import React from 'react';

import { Button } from '@material-ui/core';

import './new-user-request-item.styles.scss';

const NewUserRequestItem = ({ userRequest }) => {
  const { company, description } = userRequest;

  return (
    <div>
      {company} , {description} <Button>Aceptar</Button>
      <Button>Rechazar</Button>
    </div>
  );
};

export default NewUserRequestItem;
