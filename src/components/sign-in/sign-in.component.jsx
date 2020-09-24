import React from 'react';

import FormInput from '../form-input/form-input.component';
import { Button } from '@material-ui/core';

import { auth } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
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
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
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
