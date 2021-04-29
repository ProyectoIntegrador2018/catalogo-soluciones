import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setNotification } from '../../redux/notification/notification.actions';

import {
  Form,
  FormInput,
} from '../form/form.component';
import CButton from '../elements/c-button/c-button.component';

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
    } = this.state;

    const { setNotification } = this.props;

    if (password !== confirmPassword) {
      setNotification({
        severity: 'error',
        message: 'Las contraseñas no coinciden.',
      });
      return;
    }

    if (password.length < 6) {
      setNotification({
        severity: 'error',
        message: 'La contraseña debe contener al menos 6 caracteres.',
      });
      return;
    }

    if (phoneNumber < 1000000000 || phoneNumber > 9999999999) {
      setNotification({
        severity: 'error',
        message: 'Formato de telefono no valido.',
      });
      return;
    }
    try {
      await signUp({
        email,
        password,
        displayName,
        phoneNumber,
        orgName,
      });

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        orgName: '',
      });

      setNotification({
        severity: 'info',
        message: 'Se ha enviado un correo para confirmar la cuenta.',
      });
      
      this.props.history.push('signin');

    } catch (errorMssg) {
      setNotification({
        severity: 'error',
        message: errorMssg,
      });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  goToSignIn = () => {
    this.props.history.push('signin');
  };

  goToSignUpOrg = () => {
    this.props.history.push('signup-org');
  };

  render() {
    const {
      displayName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      orgName,
    } = this.state;
    return (
      <Form title='Crear nueva cuenta' onSubmit={this.handleSubmit}>
        <span>Crea una nueva cuenta para consultar el catálogo</span>
        <div className='sign-in'>
          ¿Ya tienes cuenta?
          <span className='sign-in-button link' onClick={this.goToSignIn}>
            Inicia sesión
          </span>
        </div>
        <div className="sign-up-line">
          ¿Quieres subir tus soluciones?
          <span className='sign-up-button link' onClick={this.goToSignUpOrg}>
            Crea una cuenta de organización
          </span>
        </div>
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
          type='number'
          name='phoneNumber'
          value={phoneNumber}
          onChange={this.handleChange}
          label='Telefono de contacto'
          required
        />
        <FormInput
          type='text'
          name='orgName'
          value={orgName}
          onChange={this.handleChange}
          label='Organización a la que perteneces'
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

        <CButton text='Crear cuenta' color='orange' type='submit' />
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setNotification: (notification) => dispatch(setNotification(notification)),
});

export default connect(null, mapDispatchToProps)(withRouter(SignUp));
