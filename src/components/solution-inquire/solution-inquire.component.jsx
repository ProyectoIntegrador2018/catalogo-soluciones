import React from 'react';
import { withRouter } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/functions';

import { FormInput, FormTextarea } from '../form/form.component';
import { Notification } from '../notifications/notification.component';
import { Button } from '@material-ui/core';

import './solution-inquire.styles.scss';
import '../form/form.styles.scss';

class SolutionInquire extends React.Component {
  constructor(props) {
    super(props);

    if (!this.props.location.state ||
      !this.props.location.state.toEmail ||
      !this.props.location.state.solutionName ||
      !this.props.location.state.orgName) {
      this.state = { shouldRender: false }
      this.props.history.push('/');
    } else {
      this.state = {
        shouldRender: true,
        name: '',
        toEmail: this.props.location.state.toEmail,
        fromEmail: '',
        inquiringOrg: '',
        solutionName: this.props.location.state.solutionName,
        orgName: this.props.location.state.orgName,
        message: '',
        errorMssg: '',
      }
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const {
      name,
      inquiringOrg,
      fromEmail,
      message,
      toEmail,
      solutionName,
    } = this.state;

    const sendContactEmail = firebase.functions().httpsCallable('sendContactEmail');
    sendContactEmail({
      toEmail,
      fromEmail,
      name,
      service: solutionName,
      org: inquiringOrg,
      message,
    }).then(() => {
      this.props.history.push({
        pathname: '/',
        state: {
          severity: 'info',
          notificationMssg: 'Se ha enviado el mensaje. Pronto recibira una respuesta por correo.',
        }
      });
    }).catch((error) => {
      console.log(error);
      this.setState({
        errorMssg: 'Error al enviar mensaje. Intente nuevamente.'
      });
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value, errorMssg: '' });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ errorMssg: '' });
  };

  render() {
    const {
      shouldRender,
      name,
      inquiringOrg,
      fromEmail,
      solutionName,
      orgName,
      message,
      errorMssg,
    } = this.state;

    return shouldRender && (
      <div className='form-container box'>
        <div className='form-content'>
          <h2 className='title'>Preguntar sobre un servicio</h2>
          <form onSubmit={this.handleSubmit}>
            <h3>Organización a contactar</h3>
            <FormInput
              type='text'
              value={orgName}
              label='Organización que se esta contactando'
              readOnly
            />
            <FormInput
              type='text'
              value={solutionName}
              label='Servicio que se está solicitando'
              readOnly
            />
            <h3>Mensaje de contacto</h3>
            <FormInput
              type='text'
              name='name'
              value={name}
              onChange={this.handleChange}
              label='Nombre de quién envía el mensaje'
              required
            />
            <FormInput
              type='text'
              name='inquiringOrg'
              value={inquiringOrg}
              onChange={this.handleChange}
              label='Nombre de su organización'
              required
            />
            <FormInput
              type='email'
              name='fromEmail'
              value={fromEmail}
              onChange={this.handleChange}
              label='Correo electrónico de contacto'
              required
            />
            <FormTextarea
              type='text'
              name='message'
              value={message}
              onChange={this.handleChange}
              label='Su mensaje'
              required
            />

            <Button variant='contained' color='primary' type='submit'>
              Enviar mensaje
            </Button>
          </form>

          <Notification
            severity='error'
            mssg={errorMssg}
            onClose={this.handleClose}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(SolutionInquire);