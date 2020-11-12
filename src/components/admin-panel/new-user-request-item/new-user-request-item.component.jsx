import React from 'react';
import { connect } from 'react-redux';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CButton from '../../elements/c-button/c-button.component';
import CModal from '../../elements/c-modal/c-modal.component';
import { Form, FormTextarea } from '../../form/form.component';

import './new-user-request-item.styles.scss';
import {
  removeOrganization,
  adminApproveOrganization,
} from '../../../redux/organizations/organizations.actions';
import { approveRequest, rejectRequest } from '../../../firebase/admin';

const NewUserRequestItem = ({
  userRequest,
  removeOrganization,
  adminApproveOrganization,
}) => {
  const {
    id,
    logo,
    orgName,
    orgType,
    displayName,
    email,
    description,
    phoneNumber,
  } = userRequest;

  const [state, setState] = React.useState({
    open: false,
    rejectReason: '',
  });

  const approveOrganization = () => {
    approveRequest(id, 'users', {
      name: displayName,
      org: orgName,
      email: email,
    });
    adminApproveOrganization(id);
  };

  const rejectOrganization = () => {
    rejectRequest(id, 'users', {
      name: displayName,
      org: orgName,
      email: email,
      message: state.rejectReason,
      uid: id,
    });
    removeOrganization(id);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState({ ...state, [name]: value });
  };

  return (
    <div className='new-user-item'>
      <Accordion className='accordion'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <div className='image-container'>
            <img src={logo} alt='logo' />
          </div>
          <span className='name'>{orgName}</span>
          <span className='type'>{orgType}</span>
          <span className='contact'>{displayName}</span>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <h4>Descripción: </h4>
            <span>{description}</span>
            <h4>Email: </h4>
            <span>{email}</span>
            <h4>Número de telefono: </h4>
            <span>{phoneNumber}</span>
          </div>
        </AccordionDetails>
      </Accordion>
      <CButton 
        text='&#10004;' alertMessage='¿Seguro que deseas aprobar al usuario?' 
        color='green' onClick={approveOrganization} 
      />
      <CButton 
        text='&#x2717;' color='red' 
        onClick={() => setState({...state, open: true})} 
      />
      <CModal
        open={state.open}
        onClose={() => setState({...state, open: false})}
      >
        <Form
          title='Motivo del rechazo'
          onSubmit={rejectOrganization}
        >
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
            text='Cancelar' color='grey' 
            onClick={() => setState({...state, open: false})} 
          />
        </Form>
      </CModal>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeOrganization: (organizationId) =>
    dispatch(removeOrganization(organizationId)),
  adminApproveOrganization: (organizationId) =>
    dispatch(adminApproveOrganization(organizationId)),
});

export default connect(null, mapDispatchToProps)(NewUserRequestItem);
