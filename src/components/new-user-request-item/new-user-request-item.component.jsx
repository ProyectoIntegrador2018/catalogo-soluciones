import React from 'react';

import './new-user-request-item.styles.scss';

const NewUserRequestItem = ({ userRequest }) => {
  const { company, description } = userRequest;

  return (
    <div>
      {company} , {description}{' '}
    </div>
  );
};

export default NewUserRequestItem;
