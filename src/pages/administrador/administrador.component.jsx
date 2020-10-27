import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUnapprovedSolutions } from '../../redux/solutions/solutions.selectors';
import { selectUnapprovedOrganizations } from '../../redux/organizations/organizations.selectors';

import NewUsersRequestsList from '../../components/admin-panel/new-user-requests-table/new-users-requests-list.component';
import NewSolutionsList from '../../components/admin-panel/new-solutions-list/new-solution-list.component';

import './administrador.styles.scss';

const Administrador = ({ organizations, solutions }) => {
  return (
    <div className='administrador'>
      <NewUsersRequestsList userRequests={organizations}></NewUsersRequestsList>
      <NewSolutionsList newSolutions={solutions}></NewSolutionsList>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  organizations: selectUnapprovedOrganizations,
  solutions: selectUnapprovedSolutions,
});

export default connect(mapStateToProps)(Administrador);
