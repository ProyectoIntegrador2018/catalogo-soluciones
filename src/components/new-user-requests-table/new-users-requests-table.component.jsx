import React from 'react';

import NewUserRequestItem from '../new-user-request-item/new-user-request-item.component';

import './new-users-requests-table.styles.scss';

const NewUsersRequestsTable = ({ userRequests }) => {
  console.log(userRequests);
  return (
    <div>
      {userRequests.map((value, index) => {
        return <NewUserRequestItem key={index} userRequest={value} />;
      })}
    </div>
  );
};

export default NewUsersRequestsTable;
