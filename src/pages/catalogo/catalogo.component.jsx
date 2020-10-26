import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectAllOrganizations } from '../../redux/organizations/organizations.selectors';
import { selectAllSolutions } from '../../redux/solutions/solutions.selectors';

import CatalogList from '../../components/catalog-list/catalog-list.component';

import './catalogo.styles.scss';

const Catalogo = ({ organizations, solutions }) => {
  console.log('testing organizations: ', organizations);
  console.log('testing solutions: ', solutions);
  return (
    <div className='catalogo'>
      <CatalogList data={solutions}></CatalogList>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  organizations: selectAllOrganizations,
  solutions: selectAllSolutions,
});

export default connect(mapStateToProps)(Catalogo);
