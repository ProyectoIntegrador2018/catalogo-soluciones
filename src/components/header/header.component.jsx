import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import { auth } from '../../firebase/firebase';

import './header.styles.scss';

import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';

const HeaderContent = ({ currentUser, goTo }) => {
  return (
    <div className='buttons'>
      <Button
        className='app-bar-button'
        onClick={() => goTo('/')}
      >
        <HomeIcon className='icon' /> Inicio
      </Button>
      <Button
        className='app-bar-button'
        onClick={() => goTo('catalogo')}
      >
        <ListIcon className='icon' /> Catálogo
      </Button>
      {currentUser && currentUser.adminAccount && (
        <Button
          className='app-bar-button'
          onClick={() => goTo('admin')}
        >
          <SettingsIcon className='icon' /> Administrador
        </Button>
      )}
      {currentUser && !currentUser.adminAccount && (
        <Button
          className='app-bar-button'
          onClick={() => goTo('crear-solucion')}
        >
          <AddIcon className='icon' /> Nueva solución
        </Button>
      )}
      {currentUser && !currentUser.adminAccount && (
        <Button
          className='app-bar-button'
          onClick={() => goTo('panel-control')}
        >
          <SettingsIcon className='icon' /> Mis soluciones
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
          <ExitToAppIcon className='icon' /> Cerrar sesion
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

  const toggleDrawer = (open) => (event) => {
    setState({ drawer: open });
  };

  const goTo = (page) => {
    setState({ drawer: false });
    history.push(page);
  };

  return (
    <div className='root'>
      <AppBar className='app-bar' position='static'>
        <center><Toolbar className='toolbar'>
          <img
            className='logo'
            src='./logoCSOFTMTY.png'
            alt='Logo CSOFTMTY'
            onClick={() => goTo('/')}
          />
          <div className='button-bar'>
            <HeaderContent currentUser={currentUser} goTo={goTo} />
          </div>
          <div className='drawer-btn'>
            <Button onClick={toggleDrawer(true)}>Menú</Button>
          </div>
        </Toolbar></center>
      </AppBar>
      <Drawer anchor='right' open={state.drawer}
        onClose={toggleDrawer(false)}>
        <HeaderContent currentUser={currentUser} goTo={goTo} />
      </Drawer>
    </div >
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
