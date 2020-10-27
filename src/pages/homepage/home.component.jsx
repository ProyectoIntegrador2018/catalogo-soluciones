import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { Container, Button } from '@material-ui/core';
import PhotoCarousel from '../../components/carousel/carousel.component';
import { Notification } from '../../components/notifications/notification.component';

import './home.styles.scss';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    var severity = '',
      notificationMssg = '';
    if (this.props.location.state) {
      severity = this.props.location.state.severity;
      notificationMssg = this.props.location.state.notificationMssg;
    }

    this.state = {
      severity: severity,
      notificationMssg: notificationMssg,
    };
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      severity: 'info',
      notificationMssg: '',
    });
  };

  goToCatalogo = () => {
    this.props.history.push('/catalogo');
  };

  goTo = (event) => {
    switch (event.target.id) {
      case 'signup':
        this.props.history.push('signup');
        break;
      case 'signin':
        this.props.history.push('signin');
        break;
      case 'crear-solucion':
        this.props.history.push('crear-solucion');
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div className='homepage'>
        <div className='banner-container'>
          <img className='background' src='./imgs/TI.jpg' alt='background' />
          <div className='banner-elements'>
            <div className='text-block'>
              <h1>Catálogo de Soluciones Digitales</h1>
              <h2>CSOFTMTY</h2>
              <p>
                Consulta soluciones de TI ofrecidas por las empresas de
                tecnología del estado de Nuevo León.
              </p>
              <Button
                id='catalogo'
                variant='contained'
                color='primary'
                onClick={this.goToCatalogo}
              >
                Acceder al catálogo
              </Button>
            </div>

            <Container className='photoCarrousel'>
              <PhotoCarousel />
            </Container>
          </div>
        </div>

        <Container className='home-container'>
          <h2 className='orange'>
            ¿Quiéres listar tus servicios en nuestro catálogo?
          </h2>
          {this.props.currentUser ? (
            <div>
              <span className='link' id='crear-solucion' onClick={this.goTo}>
                Agrega una solución
              </span>
              &nbsp; o &nbsp;
              <span className='link' id='mis-soluciones' onClick={this.goTo}>
                Administra tus soluciones
              </span>
            </div>
          ) : (
              <div>
                <span className='link' id='signup' onClick={this.goTo}>
                  Crea una cuenta
                </span>
                &nbsp; o &nbsp;
                <span className='link' id='signin' onClick={this.goTo}>
                  Inicia sesión
                </span>
              </div>
            )}

          <p>No es necesaria una cuenta para visualizar el catálogo.</p>
        </Container>

        <Notification
          severity={this.state.severity}
          mssg={this.state.notificationMssg}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(HomePage);
