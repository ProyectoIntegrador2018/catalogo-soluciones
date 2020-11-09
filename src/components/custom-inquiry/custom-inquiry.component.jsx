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
  FormSelect,
  FormOption,
  FormTextarea,
} from '../form/form.component';
import { Button } from '@material-ui/core';

import './custom-inquiry.styles.scss';

class CustomInquiry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contact: {
        name: '',
        org: '',
        position: '',
        phone: '',
        email: '',
      },
      general: {
        name: '',
        objective: '',
        dates: '',
        background: '',
      },
      detail: {
        description: '',
        optionalRequirements: '',
        requirements: '',
      },
      status: {
        userApproved: '',
        ITApproved: '',
        budget: '',
        projectType: '',
        comments: '',
      },
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { contact, general, detail, status } = this.state;

    const { setNotification } = this.props;

    const sendCustomInquiry = firebase
      .functions()
      .httpsCallable('sendCustomInquiry');
    sendCustomInquiry({
      contact,
      general,
      detail,
      status,
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
    const { contact, general, detail, status } = this.state;

    return (
      <div className='box'>
        <Form title='Consulta personalizada' onSubmit={this.handleSubmit}>
          <FormSubTitle subtitle='Datos de Contacto' />
          <FormInput
            type='text'
            name='contactName'
            value={contact.name}
            onChange={this.handleChange}
            label='Nombre de la persona'
            required
          />
          <FormInput
            type='text'
            name='contactOrg'
            value={contact.org}
            onChange={this.handleChange}
            label='Nombre de la organización'
            required
          />
          <FormInput
            type='text'
            name='contactPosition'
            value={contact.position}
            onChange={this.handleChange}
            label='Posición'
            required
          />
          <FormInput
            type='text'
            name='contactPhone'
            value={contact.phone}
            onChange={this.handleChange}
            label='Teléfono'
            required
          />
          <FormInput
            type='email'
            name='contactEmail'
            value={contact.email}
            onChange={this.handleChange}
            label='Correo electrónico'
            required
          />

          <FormSubTitle subtitle='General' />
          <FormTextarea
            type='text'
            name='generalName'
            value={general.name}
            onChange={this.handleChange}
            label='Nombre de la necesidad'
            required
          />
          <FormTextarea
            type='text'
            name='generalObjective'
            value={general.objective}
            onChange={this.handleChange}
            label='Objetivo'
            required
          />
          <FormInput
            type='text'
            name='generalDates'
            value={general.dates}
            onChange={this.handleChange}
            label='Fechas relevantes'
            required
          />
          <FormTextarea
            type='text'
            name='generalBackground'
            value={general.background}
            onChange={this.handleChange}
            label='Antecedentes [Problemática actual]'
            required
          />

          <FormSubTitle subtitle='Detalle' />
          <FormTextarea
            type='text'
            name='detailDescription'
            value={detail.description}
            onChange={this.handleChange}
            label='Descripcion de la necesidad'
            required
          />
          <FormTextarea
            type='text'
            name='detailOptionalRequirements'
            value={detail.optionalRequirements}
            onChange={this.handleChange}
            label='Listado de requerimientos (opcional)'
          />
          <FormTextarea
            type='text'
            name='detailRequirements'
            value={detail.requirements}
            onChange={this.handleChange}
            label='Requerimientos obligatorios'
            required
          />
          <FormSubTitle subtitle='Estatus de la necesidad' />
          {/*TODO: Consider changing the following 3 FormSelects to Radio buttons.*/}
          <FormSelect
            type='text'
            name='statusUserApproved'
            value={status.userApproved}
            onChange={this.handleChange}
            label='¿La necesidad ha sido aprobada por el área usuaria?'
            required
          >
            <FormOption value='' label='' disabled hidden />
            <FormOption value='Yes' label='Si' />
            <FormOption value='No' label='No' />
            <FormOption value='NotNeeded' label='No es necesario' />
          </FormSelect>
          <FormSelect
            type='text'
            name='stausITApproved'
            value={status.ITApproved}
            onChange={this.handleChange}
            label='¿La necesidad ha sido aprobada por el área de TI?'
            required
          >
            <FormOption value='' label='' disabled hidden />
            <FormOption value='Yes' label='Si' />
            <FormOption value='No' label='No' />
            <FormOption value='NotNeeded' label='No es necesario' />
          </FormSelect>
          <FormSelect
            type='text'
            name='statusBudget'
            value={status.budget}
            onChange={this.handleChange}
            label='¿La necesidad tiene un presupuseto asignado?'
            required
          >
            <FormOption value='' label='' disabled hidden />
            <FormOption value='Yes' label='Si' />
            <FormOption value='No' label='No' />
          </FormSelect>
          <FormInput
            type='text'
            name='statusProjectType'
            value={status.projectType}
            onChange={this.handleChange}
            label='Tipo de Proyecto'
            required
          />
          <FormTextarea
            type='text'
            name='statusComments'
            value={status.comments}
            onChange={this.handleChange}
            label='Comentarios adicionales'
            required
          />

          <Button variant='contained' color='primary' type='submit'>
            Enviar consulta
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
