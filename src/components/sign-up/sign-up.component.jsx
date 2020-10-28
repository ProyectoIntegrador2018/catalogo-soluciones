import React from 'react';
import { withRouter } from 'react-router-dom';

import { Form, FormSubTitle, FormInput, FormSelect, FormOption, FormTextarea, FormFile } from '../form/form.component';
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
      orgLogo,
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

    signUp(email, password, displayName, phoneNumber, orgName, orgType,
      description, orgLogo)
      .then(() => {
        this.setState({
          displayName: '',
          email: '',
          password: '',
          confirmPassword: '',
          phoneNumber: '',
          orgName: '',
          orgType: '',
          orgLogo: '',
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

  handleFile = (event) => {
    const { name } = event.target;

    this.setState({ [name]: event.target.files[0] });
  }

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
      <Form
        title='Crear nueva cuenta'
        onSubmit={this.handleSubmit}
      >
        <span>Registra tu organización</span>
        <div className='sign-in'>
          ¿Ya tienes cuenta?
            <span className='sign-in-button link' onClick={this.goToSignIn}>
            Inicia sesión
            </span>
        </div>
        <FormSubTitle>Datos del administrador</FormSubTitle>
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

        <FormSubTitle>Datos de la organización</FormSubTitle>
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
          label='Tipo de organización'
          required
        >
          <FormOption value='' label='' disabled hidden />
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
          name='orgLogo'
          onChange={this.handleFile}
          label='Logotipo de la organización'
          accept='image/jpeg'
          required
        />

        <Button variant='contained' color='primary' type='submit'>
          Crear cuenta
        </Button>

        <Notification
          severity='error'
          mssg={errorMssg}
          onClose={this.handleClose}
        />
      </Form>
    );
  }
}

export default withRouter(SignUp);
