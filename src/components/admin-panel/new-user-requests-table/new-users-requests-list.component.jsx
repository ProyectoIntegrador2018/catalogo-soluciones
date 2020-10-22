import React from 'react';

import NewUserRequestItem from '../new-user-request-item/new-user-request-item.component';

import './new-users-requests-list.styles.scss';

const NewUsersRequestsList = ({ userRequests }) => {
  console.log(userRequests);
  return (
    <div>
      <h1>Nuevas solicitudes de usuarios</h1>
      <div>
        {userRequests.map((value, index) => {
          return <NewUserRequestItem key={index} userRequest={value} />;
        })}
      </div>
    </div>
  );
};

export default NewUsersRequestsList;
