import React from 'react';
import { withRouter } from 'react-router-dom';

import { Form, FormInput } from '../form/form.component';
import { Notification } from '../notifications/notification.component';
import Button from '@material-ui/core/Button';

import { signIn } from '../../firebase/sessions';

import './sign-in.styles.scss';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    var severity = 'info', notificationMssg = '';
    if (this.props.location.state) {
      severity = this.props.location.state.severity;
      notificationMssg = this.props.location.state.notificationMssg;
    }

    this.state = {
      email: '',
      password: '',
      severity: severity,
      notificationMssg: notificationMssg,
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    signIn(email, password).then(() => {
      this.setState({ email: '', password: '' });
    }).catch((errorMssg) => {
      this.setState({
        severity: 'error',
        notificationMssg: errorMssg
      });
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

    this.setState({ notificationMssg: '' });
  };

  goToSignUp = () => {
    this.props.history.push('signup');
  };

  render() {
    return (
      <div className='min-height'>
        <Form
          title='Iniciar sesión'
          onSubmit={this.handleSubmit}
        >
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
          <Notification
            severity={this.state.severity}
            mssg={this.state.notificationMssg}
            onClose={this.handleClose}
          />
        </Form>
      </div>
    );
  }
}

export default withRouter(SignIn);
