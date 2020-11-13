import React from 'react';
import { useHistory } from 'react-router-dom';

import { changePass } from '../../firebase/sessions';

import { Form, FormInput } from '../form/form.component';
import CButton from '../elements/c-button/c-button.component';

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

      <CButton text='Guardar cambios' color='orange' type='submit' />
    </Form>
  );
}

export default NewPassForm;