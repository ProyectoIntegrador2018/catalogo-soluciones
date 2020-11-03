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
import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';

const HeaderContent = ({ currentUser, goTo }) => {
  return (
    <div className='buttons'>
      <Button onClick={() => goTo('/')}>
        <HomeIcon className='icon' /> Inicio
      </Button>
      <Button onClick={() => goTo('/catalogo')}>
        <ListIcon className='icon' /> Consultar Catálogo
      </Button>
      {currentUser && currentUser.adminAccount && (
        <Button onClick={() => goTo('panel-admin')}>
          <SettingsIcon className='icon' /> Administrador
        </Button>
      )}
      {currentUser && !currentUser.adminAccount && (
        <Button onClick={() => goTo('panel-org')}>
          <SettingsIcon className='icon' /> Herramientas
        </Button>
      )}
      {currentUser ? (
        <Button
          onClick={() => {
            auth.signOut();
            goTo('/');
          }}
        >
          <ExitToAppIcon className='icon' /> Cerrar sesion
        </Button>
      ) : null}
    </div>
  );
};

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
        <center>
          <Toolbar className='toolbar'>
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
              <Button onClick={toggleDrawer(true)}>
                <MenuIcon className='icon' /> Menú
              </Button>
            </div>
          </Toolbar>
        </center>
      </AppBar>
      <Drawer anchor='right' open={state.drawer} onClose={toggleDrawer(false)}>
        <HeaderContent currentUser={currentUser} goTo={goTo} />
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
