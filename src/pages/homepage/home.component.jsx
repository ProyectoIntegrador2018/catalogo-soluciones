import React from 'react';
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

  goToCatalogo = () => {
    this.props.history.push('/catalogo');
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      severity: 'info',
      notificationMssg: '',
    });
  };

  goToSignIn = () => {
    this.props.history.push('/signin');
  };

  goToSignUp = () => {
    this.props.history.push('/signup');
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
          <span className='link' onClick={this.goToSignUp}>
            Crea una cuenta
          </span>
          &nbsp; o &nbsp;
          <span className='link' onClick={this.goToSignIn}>
            Inicia sesión
          </span>
          <p>Después de crear tu cuenta nos pondremos en contacto contigo.</p>
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

export default HomePage;
