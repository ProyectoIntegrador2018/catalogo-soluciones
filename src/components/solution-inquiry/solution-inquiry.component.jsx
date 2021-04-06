import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setNotification } from '../../redux/notification/notification.actions';

import { functions } from '../../firebase/firebase';

import {
  Form,
  FormSubTitle,
  FormInput,
  FormTextarea,
} from '../form/form.component';
import { Button } from '@material-ui/core';

import './solution-inquiry.styles.scss';

class SolutionInquiry extends React.Component {
  constructor(props) {
    super(props);

    if (
      !this.props.location.state ||
      !this.props.location.state.toEmail ||
      !this.props.location.state.solutionName ||
      !this.props.location.state.orgName
    ) {
      this.state = { shouldRender: false };
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
      };
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

    const { setNotification } = this.props;

    const sendContactEmail = functions.httpsCallable('sendContactEmail');
    sendContactEmail({
      toEmail,
      fromEmail,
      name,
      service: solutionName,
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
      .catch((error) => {
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
    const {
      shouldRender,
      name,
      inquiringOrg,
      fromEmail,
      solutionName,
      orgName,
      message,
    } = this.state;

    return (
      shouldRender && (
        <div className='box'>
          <Form
            title='Preguntar sobre un servicio'
            onSubmit={this.handleSubmit}
          >
            <FormSubTitle subtitle='Organización a contactar' />
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
      )
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setNotification: (notification) => dispatch(setNotification(notification)),
});

export default connect(null, mapDispatchToProps)(withRouter(SolutionInquiry));
