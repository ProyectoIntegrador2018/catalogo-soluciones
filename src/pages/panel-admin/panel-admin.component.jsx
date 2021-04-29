import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUnapprovedSolutions } from '../../redux/solutions/solutions.selectors';
import { selectUnapprovedOrganizations } from '../../redux/organizations/organizations.selectors';
import { selectAllEnquiries } from '../../redux/enquiries/enquiries.selectors';
import { setNotification } from '../../redux/notification/notification.actions';

import Panel from '../../components/panel/panel.component';
import NewUsersRequestsList from '../../components/admin-panel/new-user-requests-list/new-users-requests-list.component';
import NewSolutionsList from '../../components/admin-panel/new-solutions-list/new-solution-list.component';
import NewPassForm from '../../components/new-pass-form/new-pass-form.component';
import EnquiriesList from '../../components/admin-panel/enquiries-list/enquiries-list.component';


import './panel-admin.styles.scss';

import { PlaylistAddCheck } from '@material-ui/icons';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

const PanelAdmin = ({ organizations, solutions, allEnquiries, setNotification }) => {
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
        'Seguimiento de contacto': {
          icon: <QuestionAnswerIcon />,
          component: <EnquiriesList enquiries={allEnquiries} />,
        }, 
        'Mi usuario': {
          icon: <PersonOutlineIcon />,
          component: <NewPassForm setNotification={setNotification} />,
        },
      }}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  organizations: selectUnapprovedOrganizations,
  solutions: selectUnapprovedSolutions,
  allEnquiries: selectAllEnquiries,
});

const mapDispatchToProps = (dispatch) => ({
  setNotification: (notification) => dispatch(setNotification(notification)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PanelAdmin);