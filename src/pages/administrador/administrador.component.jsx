import React from 'react';

import NewUsersRequestsTable from '../../components/new-user-requests-table/new-users-requests-table.component';
import './administrador.styles.scss';

const sampleData = [
  { company: 'ABCD', description: 'very good place to work' },
  { company: 'xyz', description: 'another place to work. Not so good.' },
];

const Administrador = () => {
  return (
    <div className='administrador'>
      <h1>Esta es la pagina de administrador.</h1>
      <NewUsersRequestsTable userRequests={sampleData}></NewUsersRequestsTable>
    </div>
  );
};

export default Administrador;
