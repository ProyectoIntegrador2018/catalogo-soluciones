import React from 'react';

import CatalogItem from '../catalog-item/catalog-item.component';

import './catalog-list.styles.scss';

const CatalogList = ({ data }) => (
  <div className='catalog-list'>
    <div className='catalog-header'>
      <div className='header-block'>
        <span>Organizacion</span>
      </div>
      <div className='header-block'>
        <span>Solucion</span>
      </div>
      <div className='header-block-small'>
        <span>Precio</span>
      </div>
    </div>
    {data.map((value, index) => {
      return <CatalogItem key={index} data={value} />;
    })}
  </div>
);

export default CatalogList;
