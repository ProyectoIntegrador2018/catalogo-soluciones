import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router-dom';

import Panel from '../../components/panel/panel.component';
import SolutionForm from '../../components/solution-form/solution-form.component';
import SolutionsList from '../../components/user-panel/solutions-list/solutions-list.component';

import { selectUserSolutions } from '../../redux/solutions/solutions.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { setNotification } from '../../redux/notification/notification.actions';

import './panel-org.styles.scss';

import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';

const PanelOrg = ({ solutions, currentUser, setNotification }) => {
  let history = useHistory();
  var render = true;
  if (!currentUser.approved) {
    render = false;
    setNotification({
      severity: 'error',
      message: 'No puedes acceder porque tu cuenta no ha sido aprobada. Te notificaremos cuando sea aprobada.',
    })
    history.push('/');
  }
  return render && (
    <Panel
      key={3}
      items={{
        'Mis soluciones': {
          icon: <ListIcon />,
          component: <SolutionsList solutions={solutions} />
        },
        'Agregar solución': {
          icon: <AddIcon />,
          component: <SolutionForm />
        }
      }}
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

