import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';

import './new-solution-item.styles.scss';
import { approveRequest, rejectRequest } from '../../../firebase/admin';

const NewSolutionItem = ({ newSolution }) => {
  const {
    id,
    imageUrl,
    organization,
    solutionName,
    price,
    descriptionPitch,
    descriptionSuccess,
  } = newSolution;

  const approveSolution = () => {
    approveRequest(id, 'solutions');
  };

  const rejectSolution = () => {
    rejectRequest(id, 'solutions');
  };

  return (
    <div className='new-solution-item'>
      <Accordion className='accordion'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <div className='image-container'>
            <img src={imageUrl} alt='logo' />
          </div>
          <span className='organization'>{organization}</span>
          <span className='solution-name'>{solutionName}</span>
          <span className='price'>${price}</span>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <h4>Descripción del servicio:</h4>
            <p>{descriptionPitch}</p>
            <h4>Casos de éxito del servicio:</h4>
            <p>{descriptionSuccess}</p>
          </div>
        </AccordionDetails>
      </Accordion>
      <span className='action-buttons'>
        <Button className='accept' onClick={approveSolution}>
          &#10004;
        </Button>
        <Button className='reject' onClick={rejectSolution}>
          &#x2717;
        </Button>
      </span>
    </div>
  );
};

export default NewSolutionItem;
