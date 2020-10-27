import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUserSolutions } from '../../redux/solutions/solutions.selectors';

import './user-panel.styles.scss';

const UserPanel = ({ solutions }) => {
  console.log('choooo chooooooo');
  console.log(solutions);

  return <div>Hola</div>;
};

const mapStateToProps = createStructuredSelector({
  solutions: selectUserSolutions,
});

export default connect(mapStateToProps)(UserPanel);
