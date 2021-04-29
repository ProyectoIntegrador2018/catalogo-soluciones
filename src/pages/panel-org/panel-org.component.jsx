import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Panel from '../../components/panel/panel.component';
import SolutionForm from '../../components/panel-org/solution-form/solution-form.component';
import SolutionsList from '../../components/panel-org/solution-list/solutions-list.component';
import EditOrgForm from '../../components/panel-org/edit-org/edit-org-form.component';
import EditUserForm from '../../components/panel-org/edit-user/edit-user-form.component';
import EnquiriesList from '../../components/panel-org/enquiries-list/enquiries-list.component';

import { selectUserSolutions } from '../../redux/solutions/solutions.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectMyOrganizationEnquiries } from '../../redux/enquiries/enquiries.selectors';
import { setNotification } from '../../redux/notification/notification.actions';

import './panel-org.styles.scss';

import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import BusinessIcon from '@material-ui/icons/Business';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

const PanelOrg = ({ solutions, currentUser, myEnquiries, setNotification }) => {
  return (
    <Panel
      key={Math.random}
      items={{
        'Mis soluciones': {
          icon: <ListIcon />,
          component: <SolutionsList solutions={solutions} />,
        },
        'Nueva solución': {
          icon: <AddIcon />,
          component: <SolutionForm currentUser={currentUser} />,
        },
        'Seguimiento de contacto': {
          icon: <QuestionAnswerIcon />,
          component: <EnquiriesList enquiries={myEnquiries} />,
        },
        'Mi organización': {
          icon: <BusinessIcon />,
          component: <EditOrgForm />,
        },
        'Mi usuario': {
          icon: <PersonOutlineIcon />,
          component: <EditUserForm />,
        },
      }}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  solutions: selectUserSolutions,
  currentUser: selectCurrentUser,
  myEnquiries: selectMyOrganizationEnquiries,
});

const mapDispatchToProps = (dispatch) => ({
  setNotification: (notification) => dispatch(setNotification(notification)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PanelOrg);
