import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase';

import { Form, FormInput } from '../form/form.component';
import CButton from '../elements/c-button/c-button.component';
import CModal from '../elements/c-modal/c-modal.component';

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
          autoComplete="username"
          required
        />
        <FormInput
          name='password'
          type='password'
          handleChange={this.handleChange}
          value={this.state.password}
          label='Contraseña'
          autoComplete="current-password"
          required
        />

        <CButton text='Inicia sesión' color='orange' type='submit' />

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

        <CModal
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
            <CButton text='Enviar' type='submit' color="orange" />
            &nbsp;&nbsp;
            <CButton text='Cancelar' onClick={this.handleClose} color="grey" />
          </Form>
        </CModal>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setNotification: (notification) => dispatch(setNotification(notification)),
});

export default connect(null, mapDispatchToProps)(withRouter(SignIn));
