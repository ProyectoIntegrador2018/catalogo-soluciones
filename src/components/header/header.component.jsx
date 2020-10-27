import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import { auth } from '../../firebase/firebase';

import './header.styles.scss';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#AAAAAA',
    boxShadow: 'none',
  },
  logo: {
    marginRight: 'auto',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  appBarButton: {
    '&:hover': {
      color: '#CC6600',
    },
  },
});

const Header = ({ currentUser }) => {
  const classes = useStyles();

  let history = useHistory();

  function goTo(page) {
    switch (page) {
      case 'home':
        history.push('/');
        break;
      default:
        history.push(page);
        break;
    }
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position='static'>
        <Toolbar>
          <img
            className={classes.logo}
            src='./logoCSOFTMTY.png'
            alt='Logo CSOFTMTY'
            onClick={() => goTo('home')}
          />
          {currentUser && currentUser.adminAccount && (
            <Button
              className={classes.appBarButton}
              onClick={() => goTo('admin')}
            >
              Administrador
            </Button>
          )}
          {currentUser && !currentUser.adminAccount && (
            <Button
              className={classes.appBarButton}
              onClick={() => goTo('crear-solucion')}
            >
              Nueva solución
            </Button>
          )}
          {currentUser ? (
            <Button
              className={classes.appBarButton}
              onClick={() => {
                auth.signOut();
                goTo('home');
              }}
            >
              Cerrar sesion
            </Button>
          ) : (
            <Button
              className={classes.appBarButton}
              onClick={() => goTo('signin')}
            >
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
