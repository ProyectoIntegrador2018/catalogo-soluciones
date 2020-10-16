import React from 'react';

import './catalog-item.styles.scss';

const CatalogItem = ({ data }) => (
  <div className='checkout-item'>
    <span className='name'>{data.name}</span>
    <span className='quantity'>{data.lastName}</span>
  </div>
);

export default CatalogItem;
