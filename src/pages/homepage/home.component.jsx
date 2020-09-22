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
      This is the HomePage.
      <Container className='photoCarrousel' maxWidth='sm'>
        <PhotoCarousel />
      </Container>
      <Container className='catalogo-button'>
        <Button variant='contained' color='primary' onClick={goToCatalogo}>
          Catalogo de soluciones
        </Button>
      </Container>
    </div>
  );
};

export default HomePage;
