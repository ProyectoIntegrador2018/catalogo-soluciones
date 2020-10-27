import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import { auth } from '../../firebase/firebase';

import './header.styles.scss';
import { ButtonGroup, Drawer } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  appBar: {
    padding: 10,
    backgroundColor: '#e6e6e6',
    boxShadow: 'none',
  },
  logo: {
    marginRight: 'auto',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  appBarButton: {
    color: '#636363',
    '&:hover': {
      color: '#CC6600',
    },
  },
});

const HeaderContent = ({ currentUser, goTo }) => {
  const classes = useStyles();

  return (
    <div className='buttons'>
      <Button
        className={classes.appBarButton}
        onClick={() => goTo('/')}
      >
        Inicio
          </Button>
      <Button
        className={classes.appBarButton}
        onClick={() => goTo('catalogo')}
      >
        Soluciones y Servicios
          </Button>
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
      {currentUser && !currentUser.adminAccount && (
        <Button
          className={classes.appBarButton}
          onClick={() => goTo('panel-control')}
        >
          Mis soluciones
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
      ) : null}
    </div>
  );
}

const Header = ({ currentUser }) => {
  const classes = useStyles();

  let history = useHistory();

  const [state, setState] = React.useState({
    drawerOpened: false,
  });

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

  const toggleDrawer = (open) => (event) => {
    setState({ drawer: open });
  };

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
        <div className='toolbar'>
          <HeaderContent currentUser={currentUser} goTo={goTo} />
        </div>
        <div className='drawer'>
          <Button onClick={toggleDrawer(true)}>Menú</Button>
          <Drawer anchor='right' open={state.drawer}
            onClose={toggleDrawer(false)}>
            <HeaderContent currentUser={currentUser} goTo={goTo} />
          </Drawer>
        </div>
        </Toolbar>
      </AppBar>
    </div >
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
