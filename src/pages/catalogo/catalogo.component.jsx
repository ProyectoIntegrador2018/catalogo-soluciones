import React from 'react';

import CatalogList from '../../components/catalog-list/catalog-list.component';

import './catalogo.styles.scss';

const Catalogo = () => (
  <div className='catalogo'>
    Esta es la pagina de catalogo.
    <CatalogList></CatalogList>
  </div>
);

export default Catalogo;
