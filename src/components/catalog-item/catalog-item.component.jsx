import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './catalog-item.styles.scss';

const CatalogItem = ({ data }) => {
  const {
    imageUrl,
    organization,
    solutionName,
    price,
    descriptionPitch,
    descriptionSuccess,
  } = data;

  console.log(data);
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
          <div>Description pitch: {descriptionPitch}</div>
          <div>Description sucess: {descriptionSuccess}</div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CatalogItem;
