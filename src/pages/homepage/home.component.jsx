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
        <div className='side-by-side'>
          <Container className='photoCarrousel' maxWidth='sm'>
            <PhotoCarousel />
          </Container>
          <Container className='landing' maxWidth='sm'>
            <h1>Catálogo de Soluciones Digitales</h1>
            <h3>
              Consulta los servicios ofrecidos por las empresas de tecnología del
              estado de Nuevo León.
          </h3>
            <br></br>
            <Button variant='contained' color='primary' onClick={this.goToCatalogo}>
              Accede al catálogo
          </Button>
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
