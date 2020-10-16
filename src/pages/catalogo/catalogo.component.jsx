import React from 'react';

import CatalogList from '../../components/catalog-list/catalog-list.component';

import './catalogo.styles.scss';

const testData = [
  {
    name: 'David',
    lastName: 'Souza',
  },
  {
    name: 'Mauricio',
    lastName: 'Guadiana',
  },
  {
    name: 'Enrique',
    lastName: 'Villa',
  },
];

const Catalogo = () => (
  <div className='catalogo'>
    <CatalogList data={testData}></CatalogList>
  </div>
);

export default Catalogo;
