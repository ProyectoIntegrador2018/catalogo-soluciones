import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import { auth } from '../../firebase/firebase';

import './header.styles.scss';

const HeaderContent = ({ currentUser, goTo }) => {
  return (
    <div className='buttons'>
      <Button
        className='app-bar-button'
        onClick={() => goTo('/')}
      >
        Inicio
          </Button>
      <Button
        className='app-bar-button'
        onClick={() => goTo('catalogo')}
      >
        Soluciones y Servicios
          </Button>
      {currentUser && currentUser.adminAccount && (
        <Button
          className='app-bar-button'
          onClick={() => goTo('admin')}
        >
          Administrador
        </Button>
      )}
      {currentUser && !currentUser.adminAccount && (
        <Button
          className='app-bar-button'
          onClick={() => goTo('crear-solucion')}
        >
          Nueva solución
        </Button>
      )}
      {currentUser && !currentUser.adminAccount && (
        <Button
          className='app-bar-button'
          onClick={() => goTo('panel-control')}
        >
          Mis soluciones
        </Button>
      )}
      {currentUser ? (
        <Button
          className='app-bar-button'
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
  let history = useHistory();

  const [state, setState] = React.useState({
    drawer: false,
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
    <div className='root'>
      <AppBar className='app-bar' position='static'>
        <Toolbar>
          <img
            className='logo'
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
