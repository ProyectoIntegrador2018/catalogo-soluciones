import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import { auth } from '../../firebase/firebase';

import './header.styles.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = ({ currentUser }) => {
  const classes = useStyles();

  let history = useHistory();

  function goTo(page) {
    if (page === 'home') {
      history.push('/');
    } else if (page === 'signin') {
      history.push('signin');
    }
  }

  return (
    <div className={`classes.root logo`}>
      <AppBar position='static'>
        <Toolbar>
          {/* TODO: Title element extends until the end of the header. Change the element width to only be
            the size of the logo/title. */}
          <Typography
            variant='h6'
            className={classes.title}
            onClick={() => goTo('home')}
          >
            CSOFTMTY
          </Typography>
          {currentUser ? (
            <Button color='inherit' onClick={() => auth.signOut()}>
              Cerrar sesion
            </Button>
          ) : (
            <Button color='inherit' onClick={() => goTo('signin')}>
              Iniciar Sesion
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
