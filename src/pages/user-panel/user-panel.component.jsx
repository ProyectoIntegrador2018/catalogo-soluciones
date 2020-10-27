import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SolutionsList from '../../components/user-panel/solutions-list/solutions-list.component';

import { selectUserSolutions } from '../../redux/solutions/solutions.selectors';

import './user-panel.styles.scss';

const UserPanel = ({ solutions }) => {
  return (
    <div>
      <SolutionsList solutions={solutions}></SolutionsList>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  solutions: selectUserSolutions,
});

export default connect(mapStateToProps)(UserPanel);
