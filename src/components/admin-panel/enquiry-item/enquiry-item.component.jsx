import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './enquiry-item.styles.scss';


const EnquiryItem = ({ enquiry }) => {
  const {
    created,
    answered,

    name,
    enquiringOrg,
    fromEmail,
    
    service,

    message,
  } = enquiry;

  const date = new Date(created.seconds * 1000);

  return (
    <div className='enquiry-admin-item'>
      <Accordion className='accordion'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel-enquiries-content'
          id='panel-enquiries-header'
        >
          <span className='header'>{service}</span>
          <span className='header'>{name}</span>
          <span className='header'>{enquiringOrg}</span>
          <span className='header'>{answered ? 'Contestada' : 'Pendiente de contestar'}</span>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <h4>Creada el:</h4>
            <p>{date.toDateString()}</p>
            <h4>Correo de contacto:</h4>
            <p>{fromEmail}</p>
            <h4>Mensaje:</h4>
            <p>{message}</p>
            <h4>Estatus:</h4>
            <p>{answered ? 'Contestada' : 'Pendiente de contestar'}</p>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default EnquiryItem;
