import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setNotification } from '../../redux/notification/notification.actions';

import firebase from 'firebase/app';
import 'firebase/functions';

import {
  Form,
  FormSubTitle,
  FormInput,
  FormTextarea,
} from '../form/form.component';
import { Button } from '@material-ui/core';

import './custom-inquiry.styles.scss';

class CustomInquiry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      fromEmail: '',
      inquiringOrg: '',
      message: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { name, inquiringOrg, fromEmail, message } = this.state;

    const { setNotification } = this.props;

    const sendContactEmail = firebase
      .functions()
      .httpsCallable('sendContactEmail');
    sendContactEmail({
      fromEmail,
      name,
      org: inquiringOrg,
      message,
    })
      .then(() => {
        setNotification({
          severity: 'info',
          message:
            'Se ha enviado el mensaje. Pronto recibira una respuesta por correo.',
        });
        this.props.history.push('/');
      })
      .catch(() => {
        setNotification({
          severity: 'info',
          message: 'Error al enviar mensaje. Intente nuevamente.',
        });
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { name, inquiringOrg, fromEmail, message } = this.state;

    return (
      <div className='box'>
        <Form title='Preguntar sobre un servicio' onSubmit={this.handleSubmit}>
          <FormSubTitle subtitle='Mensaje de contacto' />
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
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setNotification: (notification) => dispatch(setNotification(notification)),
});

export default connect(null, mapDispatchToProps)(withRouter(CustomInquiry));
