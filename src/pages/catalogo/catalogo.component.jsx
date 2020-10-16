import React from 'react';

import CatalogList from '../../components/catalog-list/catalog-list.component';

import './catalogo.styles.scss';

const testData = [
  {
    organization: 'FEMSA',
    solutionName: 'Pago de servicios en OXXO',
    price: 120000,
  },
  {
    organization: 'Techguys',
    solutionName: 'Creacion de sitios web',
    price: 50000,
  },
  {
    organization: 'Strawberry design',
    solutionName: 'Creacion de imagen corporativa',
    price: 45000,
  },
];

const Catalogo = () => (
  <div className='catalogo'>
    <CatalogList data={testData}></CatalogList>
  </div>
);

export default Catalogo;
