import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Form, FormInput } from '../form/form.component';
import Button from '@material-ui/core/Button';

import { signIn } from '../../firebase/sessions';

import { setNotification } from '../../redux/notification/notification.actions';

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

  goToSignUp = () => {
    this.props.history.push('signup');
  };

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

        <div className='sign-up'>
          Aún no tienes cuenta?
          <span className='sign-up-button link' onClick={this.goToSignUp}>
            Crear cuenta
          </span>
        </div>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setNotification: (notification) => dispatch(setNotification(notification)),
});

export default connect(null, mapDispatchToProps)(withRouter(SignIn));
