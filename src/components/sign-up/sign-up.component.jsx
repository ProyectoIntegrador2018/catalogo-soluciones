import React from 'react';

import FormInput from '../form-input/form-input.component';
import { Button } from '@material-ui/core';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );

      await user.sendEmailVerification();

      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.log(error);
      var errMssg = 'Error de inicio de sesión.';
      if (error.code == 'auth/email-already-exists') {
        errMssg = 'Ya existe una cuenta para este correo electrónico.';
      }
      alert(errMssg);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className='content-sign-up'>
        <div className='sign-up'>
          <h2 className='title'>Crear nueva cuenta</h2>
          <span>Registrate con tu correo y contraseña</span>
          <form className='sign-up-form' onSubmit={this.handleSubmit}>
            <FormInput
              type='text'
              name='displayName'
              value={displayName}
              onChange={this.handleChange}
              label='Nombre'
              required
            />
            <FormInput
              type='email'
              name='email'
              value={email}
              onChange={this.handleChange}
              label='Correo'
              required
            />
            <FormInput
              type='password'
              name='password'
              value={password}
              onChange={this.handleChange}
              label='Contraseña'
              required
            />
            <FormInput
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={this.handleChange}
              label='Confirmar contraseña'
              required
            />
            <Button variant='contained' color='primary' type='submit'>
              Crear cuenta
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
