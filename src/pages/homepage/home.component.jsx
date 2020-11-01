import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { Container, Button } from '@material-ui/core';
import PhotoCarousel from '../../components/carousel/carousel.component';

import './home.styles.scss';

class HomePage extends React.Component {
  goTo = (page) => {
    this.props.history.push(page);
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
                onClick={() => this.goTo('catalogo')}
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
            <p>Accede al menu de superior de opciones.</p>
          ) : (
            <div>
              <span className='link' onClick={() => this.goTo('signup')}>
                Crea una cuenta
              </span>
              &nbsp; o &nbsp;
              <span className='link' onClick={() => this.goTo('signin')}>
                Inicia sesión
              </span>
              <p>No es necesaria una cuenta para visualizar el catálogo.</p>
            </div>
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(HomePage);
