import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';

import './new-user-request-item.styles.scss';
import { approveRequest, rejectRequest } from '../../../firebase/admin';

const NewUserRequestItem = ({ userRequest }) => {
  const {
    id,
    logo,
    orgName,
    orgType,
    displayName,
    email,
    description,
    phoneNumber,
  } = userRequest;

  const approveOrganization = () => {
    approveRequest(id, 'users');
  };

  const rejectOrganization = () => {
    rejectRequest(id, 'users');
  };

  return (
    <div className='new-user-item'>
      <Accordion className='accordion'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <div className='image-container'>
            <img src={logo} alt='logo' />
          </div>
          <span className='name'>{orgName}</span>
          <span className='type'>{orgType}</span>
          <span className='contact'>{displayName}</span>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <h4>Descripcion: </h4>
            <span>{description}</span>
            <h4>Email: </h4>
            <span>{email}</span>
            <h4>Numero de telefono: </h4>
            <span>{phoneNumber}</span>
          </div>
        </AccordionDetails>
      </Accordion>
      <span className='action-buttons'>
        <Button className='accept' onClick={approveOrganization}>
          &#10004;
        </Button>
        <Button className='reject' onClick={rejectOrganization}>
          &#x2717;
        </Button>
      </span>
    </div>
  );
};

export default NewUserRequestItem;
