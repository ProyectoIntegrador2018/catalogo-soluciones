import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { setCurrentUser } from '../../../redux/user/user.actions';
import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { setNotification } from '../../../redux/notification/notification.actions';

import { changePass } from '../../../firebase/sessions';

import { Form, FormInput } from '../../form/form.component';
import { Button } from '@material-ui/core';

import './edit-user-form.styles.scss';

// TODO: Add functionality.
const ContactInfoForm = ({ currentUser, setCurrentUser, setNotification }) => {
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

      <Button variant='contained' color='primary' type='submit'>
        Guardar cambios
      </Button>
    </Form>
  );
}

const NewPassForm = ({ setNotification }) => {
  let history = useHistory();

  const [state, setState] = React.useState({
    oldPassword: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (state.password !== state.confirmPassword) {
      setNotification({
        severity: 'error',
        message: 'Las contraseñas no coinciden.',
      });
      return;
    }

    if (state.password.length < 6) {
      setNotification({
        severity: 'error',
        message: 'La contraseña debe contener al menos 6 caracteres.',
      });
      return;
    }

    changePass(state.oldPassword.toString(), state.password.toString())
      .then(() => {
        setNotification({
          severity: 'info',
          message: 'Contraseña modificada con éxito.',
        });
        history.push('panel-org-x');
      }).catch((errMssg) => {
        setNotification({
          severity: 'error',
          message: errMssg,
        });
      });
  }

  return (
    <Form
      title='Actualizar contraseña'
      onSubmit={handleSubmit}
    >
      <FormInput
        type='password'
        name='oldPassword'
        value={state.oldPassword}
        onChange={handleChange}
        label='Contraseña anterior'
        required
      />
      <FormInput
        type='password'
        name='password'
        value={state.password}
        onChange={handleChange}
        label='Nueva contraseña'
        required
      />
      <FormInput
        type='password'
        name='confirmPassword'
        value={state.confirmPassword}
        onChange={handleChange}
        label='Confirmar contraseña'
        required
      />

      <Button variant='contained' color='primary' type='submit'>
        Guardar cambios
      </Button>
    </Form>
  );
}

const EditUserForm = ({ currentUser, setCurrentUser, setNotification }) => (
  <div>
    <ContactInfoForm 
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
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
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setNotification: (notification) => dispatch(setNotification(notification)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditUserForm);
