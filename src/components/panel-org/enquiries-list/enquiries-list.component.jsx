import React from 'react';

import EnquiryItem from '../enquiry-item/enquiry-item.component';

import './enquiries-list.styles.scss';

const EnquiriesList = ({ enquiries }) => {
  return (
    <div className='enquiries-list'>
      <h1>Solicitudes a tus soluciones</h1>
      {enquiries.length > 0 ? (
        <div className='enquiries-header'>
          <div className='header-block-small'>
            <span>Solución solicitada</span>
          </div>
          <div className='header-block-small'>
            <span>Contacto</span>
          </div>
          <div className='header-block-small'>
            <span>Organización</span>
          </div>
          <div className='header-action-button'>
            <span>Solicitud respondida</span>
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
