import React from 'react';

import NewUserRequestItem from '../new-user-request-item/new-user-request-item.component';

import './new-users-requests-list.styles.scss';

const NewUsersRequestsList = ({ userRequests }) => {
  return (
    <div className='new-users-list'>
      <h1>Solicitudes de nuevos usuarios</h1>
      {
        userRequests.length > 0 ?
          <div className='new-users-header'>
            <div className='header-block'>
              <span>Nombre</span>
            </div>
            <div className='header-block-small'>
              <span>Tipo</span>
            </div>
            <div className='header-block'>
              <span>Punto de contacto</span>
            </div>
            <div className='header-action-button'>
              <span>Acción</span>
            </div>
          </div>
        :
          <center><h3>
            No hay solicitudes pendientes.
          </h3></center>
      }
      {userRequests.map((value, index) => {
        return <NewUserRequestItem key={index} userRequest={value} />;
      })}
    </div>
  );
};

export default NewUsersRequestsList;
