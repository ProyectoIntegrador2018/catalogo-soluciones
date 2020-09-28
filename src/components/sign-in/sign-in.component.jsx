import React from 'react';

import FormInput from '../form-input/form-input.component';
import FormError from '../form-input/form-error.component';
import Button from '@material-ui/core/Button';

import { auth } from '../../firebase/firebase';

import './sign-in.styles.scss';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errorMssg: '',
      open: false,
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '' });
    } catch (error) {
      console.log(error);
      var errorMssg = 'Error de inicio de sesión';
      if (error.code === 'auth/wrong-password') {
        errorMssg = 'La contraseña proporcionada es incorrecta.';
      }
      this.setState({ errorMssg: errorMssg });
      this.setState({ open: true });
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
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
              open={this.state.open}
              errorMssg={this.state.errorMssg}
              onClose={this.handleClose}
            />
            <div className='buttons'>
              <Button variant='contained' color='primary' type='submit'>
                Inicia sesión
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
