import React from 'react';
import { withRouter } from 'react-router-dom';

import { FormInput } from '../form/form.component';
import { Notification } from '../notifications/notification.component';
import Button from '@material-ui/core/Button';

import { signIn } from '../../firebase/sessions';

import './sign-in.styles.scss';
import '../form/form.styles.scss';

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
      <div className='form-container'>
        <div className='form-content'>
          <h2 className='title'>Iniciar sesión</h2>
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
          <div className='sign-up'>
            Aún no tienes cuenta?
            <span className='sign-up-button' onClick={this.goToSignUp}>
              Crear cuenta
            </span>
          </div>
          <Notification
            severity={this.state.severity}
            mssg={this.state.notificationMssg}
            onClose={this.handleClose}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);
