import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';

import './new-user-request-item.styles.scss';

const NewUserRequestItem = ({ userRequest }) => {
  const { imageUrl, name, type, contact } = userRequest;

  return (
    <div className='new-user-item'>
      <Accordion className='accordion'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <div className='image-container'>
            <img src={imageUrl} alt='logo' />
          </div>
          <span className='name'>{name}</span>
          <span className='type'>{type}</span>
          <span className='contact'>{contact}</span>
        </AccordionSummary>
        <AccordionDetails>More details about this solution</AccordionDetails>
      </Accordion>
      <span className='action-buttons'>
        <Button className='accept'>&#10004;</Button>
        <Button className='reject'>&#x2717;</Button>
      </span>
    </div>
  );
};

export default NewUserRequestItem;
