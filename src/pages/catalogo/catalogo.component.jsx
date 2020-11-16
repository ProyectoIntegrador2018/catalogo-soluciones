import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectApprovedSolutions } from '../../redux/solutions/solutions.selectors';

import CatalogList from '../../components/catalog/catalog-list/catalog-list.component';
import CatalogSolutionList from '../../components/catalog/catalog-solution-list/catalog-solution-list.component';

import './catalogo.styles.scss';

const Catalogo = ({ solutions }) => {

  return (
    <div className='catalogo'>
      <h1>Catálogo de soluciones digitales</h1>
      <br></br><br></br>
      <span className='web-catalog'>
        <CatalogList data={solutions} />
      </span>
      <span className='mobile-catalog'>
        <CatalogSolutionList  solutions={solutions} />
      </span>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  solutions: selectApprovedSolutions,
});

export default connect(mapStateToProps)(Catalogo);
