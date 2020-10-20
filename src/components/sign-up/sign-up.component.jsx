import React from 'react';
import { withRouter } from 'react-router-dom';

import { FormInput, FormSelect, FormOption, FormTextarea, FormFile } from '../form-input/form-input.component';
import { Notification } from '../notifications/notification.component';
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
      orgName: '',
      orgType: '',
      description: '',
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
      orgName,
      orgType,
      description,
    } = this.state;

    if (password !== confirmPassword) {
      this.setState({ errorMssg: 'Las contraseñas no coinciden.' });
      return;
    }

    if (phoneNumber < 1000000000 || phoneNumber > 9999999999) {
      this.setState({ errorMssg: 'Formato de telefono no valido.' });
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
          orgName: '',
          orgType: '',
          description: '',
        });
        this.props.history.push({
          pathname: 'signin',
          state: {
            severity: 'info',
            notificationMssg: 'Se ha enviado un correo para confirmar la cuenta.'
          }
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

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ errorMssg: '' });
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
      orgName,
      orgType,
      description,
    } = this.state;
    return (
      <div className='content-sign-up'>
        <div className='sign-up'>
          <h2 className='title'>Crear nueva cuenta</h2>
          <span>Registrate tu organización con tu correo y contraseña</span>
          <div className='sign-in'>
            ¿Ya tienes cuenta?
            <span className='sign-in-button' onClick={this.goToSignIn}>
              Inicia sesión
            </span>
          </div>
          <form className='sign-up-form' onSubmit={this.handleSubmit}>
            <h3>Datos de la organización</h3>
            <FormInput
              type='text'
              name='orgName'
              value={orgName}
              onChange={this.handleChange}
              label='Nombre de la organización'
              required
            />
            <FormSelect
              type='text'
              name='orgType'
              value={orgType}
              onChange={this.handleChange}
              label='Tipo de empresa'
              required
            >
              <FormOption value='' label='' selected disabled hidden />
              <FormOption value='micro' label='Micro' />
              <FormOption value='pequeña' label='Pequeña' />
              <FormOption value='mediana' label='Mediana' />
              <FormOption value='grande' label='Grande' />
            </FormSelect>
            <FormTextarea
              type='text'
              name='description'
              value={description}
              onChange={this.handleChange}
              label='Describe tu organización. Esto será mostrado a los usuarios del catálogo.'
              required
            />
            <FormFile
              id='orgLogo'
              onChange={this.handleChange}
              label='Logotipo de la organización'
              accept='image/jpeg'
              required
            />

            <h3>Datos del usuario</h3>
            <FormInput
              type='text'
              name='displayName'
              value={displayName}
              onChange={this.handleChange}
              label='Nombre del administrador de la cuenta'
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
            <Button variant='contained' color='primary' type='submit'>
              Crear cuenta
            </Button>
          </form>
          <Notification
            severity='error'
            mssg={errorMssg}
            onClose={this.handleClose}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
