import React from 'react';
import { withRouter } from 'react-router-dom';

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
      phoneNumber: '',
      errorMssg: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const {
      displayName,
      email,
      password,
      confirmPassword,
      phoneNumber,
    } = this.state;

    if (password !== confirmPassword) {
      this.setState({ errorMssg: 'Las contraseñas no coinciden.' });
      this.setState({ open: true });
      return;
    }

    if (phoneNumber < 1000000000 || phoneNumber > 9999999999) {
      this.setState({ errorMssg: 'Formato de telefono no valido.' });
      this.setState({ open: true });
      return;
    }

    signUp(email, password, displayName, phoneNumber)
      .then(() => {
        this.setState({
          displayName: '',
          email: '',
          password: '',
          confirmPassword: '',
          phoneNumber: '',
          errorMssg: '',
          open: false,
        });
        this.props.history.push('/');
      })
      .catch((errorMssg) => {
        this.setState({ errorMssg: errorMssg });
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value, errorMssg: '' });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  goToSignIn = () => {
    this.props.history.push('signin');
  };

  render() {
    const {
      displayName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      errorMssg,
      open,
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
              label='Nombre comercial de la empresa'
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
            <FormInput
              type='number'
              name='phoneNumber'
              value={phoneNumber}
              onChange={this.handleChange}
              label='Telefono de contacto'
              required
            />
            <FormError
              open={open}
              errorMssg={errorMssg}
              onClose={this.handleClose}
            />
            <Button variant='contained' color='primary' type='submit'>
              Crear cuenta
            </Button>
          </form>
          <div className='sign-in'>
            Ya tienes cuenta?
            <span className='sign-in-button' onClick={this.goToSignIn}>
              Inicia sesión
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
