import React from 'react';
import { connect } from 'react-redux';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CButton from '../../elements/c-button/c-button.component';
import CModal from '../../elements/c-modal/c-modal.component';
import { Form, FormTextarea } from '../../form/form.component';

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
    reciprocity,
    descriptionPitch,
    descriptionSuccess,
    email,
    category,
    flyer,
  } = newSolution;

  const [state, setState] = React.useState({
    open: false,
    rejectReason: '',
  });

  const approveSolution = () => {
    approveRequest(id, 'solutions', {
      org: organization,
      solutionName,
      email,
    });
    // Change state using redux.
    adminApproveSolution(id);
  };

  const rejectSolution = () => {
    rejectRequest(id, 'solutions', {
      org: organization,
      solutionName,
      email,
      message: state.rejectReason,
    });
    removeSolution(id);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState({ ...state, [name]: value });
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
          <span className='category'>{category}</span>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <h4>Esquema de precios:</h4>
            <p>{price}</p>
            <h4>Porcentaje de reciprocidad:</h4>
            <p>{reciprocity}</p>
            <h4>Descripción del servicio:</h4>
            <p>{descriptionPitch}</p>
            <h4>Casos de éxito del servicio:</h4>
            <p>{descriptionSuccess}</p>
            {flyer && (
              <img className='catalog-solution-flyer' src={flyer} alt='flyer' />
            )}
          </div>
        </AccordionDetails>
      </Accordion>
      <CButton
        text='&#10004;'
        alertMessage='¿Seguro que deseas aprobar la solución?'
        color='green'
        onClick={approveSolution}
      />
      <CButton
        text='&#x2717;'
        color='red'
        onClick={() => setState({ ...state, open: true })}
      />
      <CModal
        open={state.open}
        onClose={() => setState({ ...state, open: false })}
      >
        <Form title='Motivo del rechazo' onSubmit={rejectSolution}>
          <span>Especifíca el mótivo del rechazo.</span>
          <FormTextarea
            type='text'
            name='rejectReason'
            value={state.rejectReason}
            onChange={handleChange}
            label='Motivo del rechazo'
            required
          />
          <CButton text='Enviar' color='orange' type='submit' />
          <CButton
            text='Cancelar'
            color='grey'
            onClick={() => setState({ ...state, open: false })}
          />
        </Form>
      </CModal>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeSolution: (solution) => dispatch(removeSolution(solution)),
  adminApproveSolution: (solutionId) =>
    dispatch(adminApproveSolution(solutionId)),
});

export default connect(null, mapDispatchToProps)(NewSolutionItem);
