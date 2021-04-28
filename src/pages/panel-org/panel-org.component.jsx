import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router-dom';

import Panel from '../../components/panel/panel.component';
import SolutionForm from '../../components/panel-org/solution-form/solution-form.component';
import SolutionsList from '../../components/panel-org/solution-list/solutions-list.component';
import EditOrgForm from '../../components/panel-org/edit-org/edit-org-form.component';
import EditUserForm from '../../components/panel-org/edit-user/edit-user-form.component';

import { selectUserSolutions } from '../../redux/solutions/solutions.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { setNotification } from '../../redux/notification/notification.actions';

import './panel-org.styles.scss';

import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import BusinessIcon from '@material-ui/icons/Business';
import ACCOUNT_STATUS from '../../constants/account-status';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

const PanelOrg = ({ solutions, currentUser, setNotification }) => {
  let history = useHistory();
  const isApproved = currentUser.status !== ACCOUNT_STATUS.Pending

  const misSolucionesMaybe = isApproved ? {
    'Mis soluciones': {
      icon: <ListIcon />,
      component: <SolutionsList solutions={solutions} />,
    },
    'Nueva solución': {
      icon: <AddIcon />,
      component: <SolutionForm />,
    },
  } : {}

  if (currentUser.status === ACCOUNT_STATUS.Rejected) {
    setNotification({
      severity: 'error',
      message:
        'Tu cuenta fue rechazada por el administrador. Contactate con CSOFT Mty para tener la oportunidad de ser reevaluado.',
    });
  }

  const items = {
    ...misSolucionesMaybe,
    'Mi organización': {
      icon: <BusinessIcon />,
      component: <EditOrgForm />,
    },
    'Mi usuario': {
      icon: <PersonOutlineIcon />,
      component: <EditUserForm />,
    },
  };

  return (
    <Panel
      key={Math.random}
      items={items}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  solutions: selectUserSolutions,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setNotification: (notification) => dispatch(setNotification(notification)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PanelOrg);
