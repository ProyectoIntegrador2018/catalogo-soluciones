import React from 'react';
import { withRouter } from 'react-router-dom';

import FormInput from '../form-input/form-input.component';
import { FormError } from '../notifications/notification.component';
import Button from '@material-ui/core/Button';

import { signIn } from '../../firebase/sessions';

import './sign-in.styles.scss';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errorMssg: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    signIn(email, password).then(() => {
      this.setState({ email: '', password: '' });
    }).catch((errorMssg) => {
      this.setState({ errorMssg: errorMssg });
    })
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ errorMssg: '' });
  };

  goToSignUp = () => {
    this.props.history.push('signup');
  };

  render() {
    return (
      <div className='content-sign-in'>
        <div className='sign-in'>
          <h2>Iniciar sesión</h2>
          <span>Inicia sesión con tu correo y contraseña</span>
          <form onSubmit={this.handleSubmit}>
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
            <FormError
              errorMssg={this.state.errorMssg}
              onClose={this.handleClose}
            />
            <div className='buttons'>
              <Button variant='contained' color='primary' type='submit'>
                Inicia sesión
              </Button>
            </div>
          </form>
          <div className='sign-up'>
            Aún no tienes cuenta?
            <span className='sign-up-button' onClick={this.goToSignUp}>
              Crear cuenta
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);
