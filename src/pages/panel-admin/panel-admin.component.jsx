import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUnapprovedSolutions } from '../../redux/solutions/solutions.selectors';
import { selectUnapprovedOrganizations } from '../../redux/organizations/organizations.selectors';

import Panel from '../../components/panel/panel.component';
import NewUsersRequestsList from '../../components/admin-panel/new-user-requests-list/new-users-requests-list.component';
import NewSolutionsList from '../../components/admin-panel/new-solutions-list/new-solution-list.component';

import './panel-admin.styles.scss';

import { PlaylistAddCheck } from '@material-ui/icons';

const PanelAdmin = ({ organizations, solutions }) => {
  return (
    <Panel
      items={{
        'Solicitudes de organizaciones': {
          icon: <PlaylistAddCheck />,
          component: <NewUsersRequestsList userRequests={organizations} />,
        },
        'Solicitudes de soluciones': {
          icon: <PlaylistAddCheck />,
          component: <NewSolutionsList newSolutions={solutions} />,
        },
      }}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  organizations: selectUnapprovedOrganizations,
  solutions: selectUnapprovedSolutions,
});

export default connect(mapStateToProps)(PanelAdmin);
