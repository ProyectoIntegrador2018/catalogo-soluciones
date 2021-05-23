import React from 'react';

import EnquiryItem from '../enquiry-item/enquiry-item.component';

import './enquiries-list.styles.scss';

const EnquiriesList = ({ enquiries, displayTitle = true }) => {
  return (
    <div className='enquiries-admin-list'>
      {displayTitle && <h1>Seguimiento de contacto a soluciones</h1>}
      {enquiries.length > 0 ? (
        <div className='enquiries-header'>
          <div className='header-block'>
            <span>Solución solicitada</span>
          </div>
          <div className='header-block'>
            <span>Contacto</span>
          </div>
          <div className='header-block'>
            <span>Organización</span>
          </div>
          <div className='header-block'>
            <span>Estaus</span>
          </div>
        </div>
      ) : (
        <center>
          <h3>No han solicitado tus soluciones aún.</h3>
        </center>
      )}
      {enquiries.map((value, index) => {
        return <EnquiryItem key={index} enquiry={value} />;
      })}
    </div>
  );
};

export default EnquiriesList;
