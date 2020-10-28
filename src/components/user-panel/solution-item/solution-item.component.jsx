import React from 'react';
import { connect } from 'react-redux';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';

import './solution-item.styles.scss';
import { removeSolution } from '../../../redux/solutions/solutions.actions';
import { deleteUserSolution } from '../../../firebase/user-panel';
import { useHistory } from 'react-router-dom';

const SolutionItem = ({ solution, removeSolution }) => {
  const history = useHistory();

  const {
    id,
    solutionName,
    price,
    descriptionPitch,
    descriptionSuccess,
  } = solution;

  const removeItem = () => {
    deleteUserSolution(id);
    removeSolution(id);
  };

  const modifyItem = () => {
    history.push('/editar-solucion', { ...solution });
  };

  return (
    <div className='solution-item'>
      <Accordion className='accordion'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
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
        <Button className='modify' onClick={modifyItem}>
          Editar
        </Button>
        <Button className='delete' onClick={removeItem}>
          Borrar
        </Button>
      </span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeSolution: (solution) => dispatch(removeSolution(solution)),
});

export default connect(null, mapDispatchToProps)(SolutionItem);
