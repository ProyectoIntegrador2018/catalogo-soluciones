import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";

import './catalog-item.styles.scss';

const CatalogItem = ({ data }) => {
  const {
    imageUrl,
    organization,
    solutionName,
    price,
    descriptionPitch,
    descriptionSuccess,
    email,
  } = data;

  let history = useHistory();

  const goToSolutionInquire = () => {
    history.push({
      pathname: 'solution-inquire',
      state: {
        solutionName: solutionName,
        toEmail: email,
        orgName: organization
      }
    });
  };

  return (
    <div className='catalog-item'>
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
            <Button variant='contained' color='primary'
              onClick={goToSolutionInquire}>
              Preguntar por este servicio
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CatalogItem;
