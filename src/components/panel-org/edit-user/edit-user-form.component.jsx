import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { setNotification } from '../../../redux/notification/notification.actions';
import NewPassForm from '../../new-pass-form/new-pass-form.component';

import { Form, FormInput } from '../../form/form.component';
import CButton from '../../elements/c-button/c-button.component';

import { firestore } from '../../../firebase/firebase';

import './edit-user-form.styles.scss';

const ContactInfoForm = ({ currentUser, setNotification }) => {
  let history = useHistory();

  const [state, setState] = React.useState({
    displayName: currentUser.displayName,
    email: currentUser.email,
    phoneNumber: currentUser.phoneNumber,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    firestore.collection('users').doc(currentUser.id).update({
      displayName: state.displayName,
      phoneNumber: state.phoneNumber,
    }).then(() => {
      setNotification({
        severity: 'info',
        message: 'Se han actualizado los datos exitosamente.'
      });
      history.push('panel-org-x');
    }).catch(() => {
      setNotification({
        severity: 'error',
        message: 'Error al actualizar datos. Intentar nuevamente.'
      });
    });
  }

  return (
    <Form
      title='Información de contacto'
      onSubmit={handleSubmit}
    >
      <FormInput
        type='email'
        name='email'
        value={state.email}
        onChange={handleChange}
        label='Correo (No puede ser modificado)'
        disabled
        required
      />
      <FormInput
        type='text'
        name='displayName'
        value={state.displayName}
        onChange={handleChange}
        label='Nombre del administrador de la cuenta'
        required
      />
      <FormInput
        type='number'
        name='phoneNumber'
        value={state.phoneNumber}
        onChange={handleChange}
        label='Telefono de contacto'
        required
      />

      <CButton text='Guardar cambios' color='orange' type='submit' />
    </Form>
  );
}

const EditUserForm = ({ currentUser, setCurrentUser, setNotification }) => (
  <div>
    <ContactInfoForm 
      currentUser={currentUser}
      setNotification={setNotification} 
    />
    <br></br><br></br>
    <NewPassForm 
      setNotification={setNotification} 
    />
  </div>
);
  
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setNotification: (notification) => dispatch(setNotification(notification)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditUserForm);
