import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { Container } from '@material-ui/core';
import PhotoCarousel from '../../components/carousel/carousel.component';
import CButton from '../../components/elements/c-button/c-button.component';

import './home.styles.scss';

const HomePage = ({ currentUser }) => {
  let history = useHistory();

  const goTo = (page) => {
    history.push(page);
  };

  return (
    <div className='homepage'>
      <div className='banner-container'>
        <img className='background' src='./imgs/TI.jpg' alt='background' />
        <div className='banner-elements'>
          <div className='text-block'>
            <h1>Catálogo de Soluciones Digitales</h1>
            <h2>CSOFTMTY</h2>
            <p>
              Consulta soluciones de TI ofrecidas por las empresas de tecnología
              del estado de Nuevo León.
            </p>
            <CButton
              text='Acceder al catálogo'
              color='orange'
              onClick={() => goTo('catalogo')}
            />
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
        {currentUser ? (
          <p>Accede al menu de superior de opciones.</p>
        ) : (
          <div>
            <span className='link' onClick={() => goTo('signup')}>
              Crea una cuenta
            </span>
            &nbsp; o &nbsp;
            <span className='link' onClick={() => goTo('signin')}>
              Inicia sesión
            </span>
            <p>No es necesaria una cuenta para visualizar el catálogo.</p>
          </div>
        )}
      </Container>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(HomePage);
