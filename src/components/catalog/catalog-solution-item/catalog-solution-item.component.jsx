import React from 'react';
import { useHistory } from 'react-router-dom';

import { Accordion, AccordionDetails, AccordionSummary, Grid } from '@material-ui/core';
import CButton from '../../elements/c-button/c-button.component';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './catalog-solution-item.styles.scss'

const CatalogSolutionItem = ({ solution }) => {
  let history = useHistory()

  const goToSolutionInquiry = (data) => {
    history.push({
      pathname: 'solution-inquiry',
      state: {
        solutionName: data.solutionName,
        toEmail: data.email,
        orgName: data.organization,
      },
    });
  };

  return (
    <Accordion className='solution'>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container spacing={3} alignItems='center'>
          <Grid item xs={3}>
            <img className='catalog-solution-logo' src={solution.imageUrl} alt='logo' />
          </Grid>
          <Grid item xs={9}>
            <h3 className='solutionName'>{solution.solutionName}</h3>
            <p>{solution.descriptionPitch}</p>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3} alignItems='center'>
          <Grid item xs={12}>
            {solution.flyer ?
              <img className='catalog-solution-flyer' src={solution.flyer} alt='flyer' />
            : null}
          </Grid>
          <Grid item xs={12}>
            <p>Ofrecida por: <b>{solution.organization}</b></p>
            <p>Tipo de solución: <i>{solution.category}</i></p>
            <p>Casos de éxito: {solution.descriptionSuccess}</p>
            <p>Esquema de precios: {solution.price}</p>
            <br></br>
            <center><CButton
              text='Preguntar por este servicio'
              color='grey'
              onClick={() => goToSolutionInquiry(solution)}
            /></center>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default CatalogSolutionItem