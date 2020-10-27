import React from 'react';
import { Container, Button } from '@material-ui/core';
import PhotoCarousel from '../../components/carousel/carousel.component';
import { Notification } from '../../components/notifications/notification.component';

import './home.styles.scss';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    var severity = '', notificationMssg = '';
    if (this.props.location.state) {
      severity = this.props.location.state.severity;
      notificationMssg = this.props.location.state.notificationMssg;
    }

    this.state = {
      severity: severity,
      notificationMssg: notificationMssg,
    }
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
    })
  };

  render() {
    return (
      <div className='homepage'>
        <div className='background-container'>
          <img className='background' src='./imgs/TI.jpg' alt='background' />
          <div class="text-block">
            <h1>Catálogo de Soluciones Digitales</h1>
            <h2>CSOFTMTY</h2>
            <p>
              Consulta los servicios ofrecidos por las empresas de tecnología
              del estado de Nuevo León.
            </p>
            <Button variant='contained' color='primary' onClick={this.goToCatalogo}>
              Accede al catálogo
            </Button>
          </div>
          <br></br>
          <Container className='photoCarrousel'>
            <PhotoCarousel />
          </Container>
        </div>

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
