import React from 'react';
import { connect } from 'react-redux';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CButton from '../../elements/c-button/c-button.component';

import './new-solution-item.styles.scss';
import {
  removeSolution,
  adminApproveSolution,
} from '../../../redux/solutions/solutions.actions';
import { approveRequest, rejectRequest } from '../../../firebase/admin';

const NewSolutionItem = ({
  newSolution,
  removeSolution,
  adminApproveSolution,
}) => {
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
    // Change state using redux.
    adminApproveSolution(id);
  };

  const rejectSolution = () => {
    rejectRequest(id, 'solutions');
    removeSolution(id);
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
      <CButton text='&#10004;' color='green' onClick={approveSolution} />
      <CButton text='&#x2717;' color='red' onClick={rejectSolution} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeSolution: (solution) => dispatch(removeSolution(solution)),
  adminApproveSolution: (solutionId) =>
    dispatch(adminApproveSolution(solutionId)),
});

export default connect(null, mapDispatchToProps)(NewSolutionItem);
