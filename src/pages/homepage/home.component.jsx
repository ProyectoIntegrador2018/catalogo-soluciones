import React from 'react';
import { Container, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PhotoCarousel from '../../components/carousel/carousel.component';

import './home.styles.scss';

const HomePage = () => {
  let history = useHistory();

  const goToCatalogo = () => {
    history.push('/catalogo');
  };

  return (
    <div className='homepage'>
      <div className='side-by-side'>
        <Container className='landing' maxWidth='sm'>
          <h1>Catálogo de Soluciones Digitales</h1>
          <h3>
            Consulta los servicios ofrecidos por las empresas de tecnología
            del estado de Nuevo León.
          </h3>
          <br></br>
          <Button variant='contained' color='primary' onClick={goToCatalogo}>
            Accede al catálogo
          </Button>
        </Container>
        <Container className='photoCarrousel' maxWidth='sm'>
          <PhotoCarousel />
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
