import React from 'react';

import FormInput from '../form-input/form-input.component';
import FormError from '../form-input/form-error.component';
import { Button } from '@material-ui/core';

import { signUp } from '../../firebase/sessions';

import './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMssg: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      this.setState({ errorMssg: 'Las contraseñas no coinciden.' });
      return;
    }

    signUp(email, password, displayName)
      .then(() => {
        this.setState({
          displayName: '',
          email: '',
          password: '',
          confirmPassword: '',
          errorMssg: '',
        });
      })
      .catch((errorMssg) => {
        this.setState({ errorMssg: errorMssg });
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value, errorMssg: '' });
  };

  clearError = (_) => {
    this.setState({ errorMssg: '' });
  };

  render() {
    const {
      displayName,
      email,
      password,
      confirmPassword,
      errorMssg,
    } = this.state;
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
            <FormError onChange={this.clearError} errorMssg={errorMssg} />
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
