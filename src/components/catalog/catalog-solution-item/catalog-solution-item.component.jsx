import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
} from '@material-ui/core';
import CButton from '../../elements/c-button/c-button.component';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './catalog-solution-item.styles.scss';

const MultiLine = ({ title, text }) => (
  <div>
    {title}
    {text.split('\n').map((str, i) => (
      <p key={i} style={{ paddingLeft: '2em' }}>{str}</p>
    ))}
  </div>
);

const CatalogSolutionItem = ({ solution, currentUser }) => {
  let history = useHistory();

  const goToSolutionInquiry = (data) => {
    history.push({
      pathname: '/solution-inquiry',
      state: {
        solutionName: data.solutionName,
        toEmail: data.email,
        orgName: data.organization,
        organizationID: data.organizationID
      },
    });
  };

  return (
    <Accordion className='solution'>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container spacing={3} alignItems='center'>
          <Grid item xs={3}>
            <img
              className='catalog-solution-logo'
              src={solution.imageUrl}
              alt='logo'
            />
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
            {solution.flyer ? (
              <img
                className='catalog-solution-flyer'
                src={solution.flyer}
                alt='flyer'
              />
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <p>
              Ofrecida por: <b>{solution.organization}</b>
            </p>
            <p>
              Tipo de solución: <i>{solution.category}</i>
            </p>
            <MultiLine
              title='Casos de éxito:'
              text={solution.descriptionSuccess}
            />
            <MultiLine title='Esquema de precio:' text={solution.price} />
            {currentUser && currentUser.adminAccount && solution.reciprocity ? (
              <MultiLine
                title='Porcentaje de reciprocidad:'
                text={solution.reciprocity}
              />
            ) : null}
            <br></br>
            <center>
              <CButton
                text='Preguntar por este servicio'
                color='grey'
                onClick={() => goToSolutionInquiry(solution)}
              />
            </center>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default CatalogSolutionItem;
