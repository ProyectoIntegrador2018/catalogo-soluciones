import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectApprovedSolutions } from '../../redux/solutions/solutions.selectors';

import CatalogList from '../../components/catalog-list/catalog-list.component';

import './catalogo.styles.scss';

const Catalogo = ({ solutions }) => {
  return (
    <div className='catalogo'>
      <h1>Catálogo de soluciones digitales</h1>
      <CatalogList data={solutions}></CatalogList>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  solutions: selectApprovedSolutions,
});

export default connect(mapStateToProps)(Catalogo);
