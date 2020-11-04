import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase';

import { Form, FormInput } from '../form/form.component';
import { Button, Modal } from '@material-ui/core';

import { signIn } from '../../firebase/sessions';

import { setNotification } from '../../redux/notification/notification.actions';

import './sign-in.styles.scss';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      emailForgot: '',
      openForgot: false,
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    signIn(email, password)
      .then(() => {
        this.setState({ email: '', password: '' });
      })
      .catch((errorMssg) => {
        this.props.setNotification({
          severity: 'error',
          message: errorMssg,
        });
      });
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  handleClose = () => {
    this.setState({ openForgot: false, emailForgot: '' });
  }

  forgotPass = () => {
    auth.sendPasswordResetEmail(this.state.emailForgot).then(() => {
      this.setState({ openForgot: false, emailForgot: '' });
      this.props.setNotification({
        severity: 'info',
        message: 'Se ha enviado el correo electrónico de recuperación.'
      });
    }).catch((_) => {
      this.props.setNotification({
        severity: 'error',
        message: 'Error, favor de intentar nuevamente.'
      });
    });
  }

  render() {
    return (
      <Form title='Iniciar sesión' onSubmit={this.handleSubmit}>
        <span>Inicia sesión con tu correo y contraseña</span>

        <FormInput
          name='email'
          type='email'
          handleChange={this.handleChange}
          value={this.state.email}
          label='Correo'
          required
        />
        <FormInput
          name='password'
          type='password'
          handleChange={this.handleChange}
          value={this.state.password}
          label='Contraseña'
          required
        />

        <Button variant='contained' color='primary' type='submit'>
          Inicia sesión
        </Button>

        <span className='inline'>
          ¿Olvidaste tu contraseña?
          <span
            className='link-button link'
            onClick={() => this.setState({ openForgot: true })}
          >
            Recuperala
          </span>
        </span>
        <br></br><br></br><br></br>
        <div>
          ¿Aún no tienes cuenta?
          <span
            className='link-button link'
            onClick={() => this.props.history.push('signup')}
          >
            Crear cuenta
          </span>
        </div>

        <Modal
          className='modal'
          open={this.state.openForgot}
          onClose={this.handleClose}
        >
          <Form 
            title='Enviar correo de recuperación' 
            onSubmit={this.forgotPass}
          >
            <span>
              Proporciona el correo electrónico asociado a la cuenta:
            </span>
            <FormInput
              name='emailForgot'
              type='email'
              handleChange={this.handleChange}
              value={this.state.emailForgot}
              label='Correo'
              required
            />
            <Button type='submit' color="primary" variant='contained'>
              Enviar
            </Button>
            &nbsp;&nbsp;
            <Button 
              onClick={this.handleClose} 
              color="secondary" 
              variant='contained'
            >
              Cancelar
            </Button>
          </Form>
        </Modal>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setNotification: (notification) => dispatch(setNotification(notification)),
});

export default connect(null, mapDispatchToProps)(withRouter(SignIn));
