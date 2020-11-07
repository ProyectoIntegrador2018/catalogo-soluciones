import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button } from '@material-ui/core';

import { selectApprovedSolutions } from '../../redux/solutions/solutions.selectors';

import CatalogList from '../../components/catalog-list/catalog-list.component';

import './catalogo.styles.scss';
import { useHistory } from 'react-router-dom';

const Catalogo = ({ solutions }) => {
  let history = useHistory();

  return (
    <div className='catalogo'>
      <h1>Catálogo de soluciones digitales</h1>
      <div className='custom-inquiry'>
        <p>No encuentras los que buscas? Realiza una consulta personalizada</p>
        <Button
          variant='contained'
          color='primary'
          onClick={() => history.push('custom-inquiry')}
        >
          Realizar consulta
        </Button>
      </div>

      <CatalogList data={solutions}></CatalogList>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  solutions: selectApprovedSolutions,
});

export default connect(mapStateToProps)(Catalogo);
