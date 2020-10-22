import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';

import './new-solution-item.styles.scss';

const NewSolutionItem = ({ newSolution }) => {
  const { imageUrl, organization, solutionName, price } = newSolution;

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
        <AccordionDetails>More details about this solution</AccordionDetails>
      </Accordion>
      <span className='action-buttons'>
        <Button className='accept'>&#10004;</Button>
        <Button className='reject'>&#x2717;</Button>
      </span>
    </div>
  );
};

export default NewSolutionItem;
