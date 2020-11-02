import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Panel from '../../components/panel/panel.component';
import SolutionForm from '../../components/solution-form/solution-form.component';
import SolutionsList from '../../components/user-panel/solutions-list/solutions-list.component';

import { selectUserSolutions } from '../../redux/solutions/solutions.selectors';

import './panel-org.styles.scss';

import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';

const PanelOrg = ({ solutions }) => {
  return (
    <Panel
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
});

export default connect(mapStateToProps)(PanelOrg);
