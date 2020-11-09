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
      contactName: '',
      contactOrg: '',
      contactPosition: '',
      contactPhone: '',
      contactEmail: '',
      generalName: '',
      generalObjective: '',
      generalDates: '',
      generalBackground: '',
      detailDescription: '',
      detailOptionalRequirements: '',
      detailRequirements: '',
      statusUserApproved: '',
      statusITApproved: '',
      statusBudget: '',
      statusProjectType: '',
      statusComments: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const {
      contactName,
      contactOrg,
      contactPosition,
      contactPhone,
      contactEmail,
      generalName,
      generalObjective,
      generalDates,
      generalBackground,
      detailDescription,
      detailOptionalRequirements,
      detailRequirements,
      statusUserApproved,
      statusITApproved,
      statusBudget,
      statusProjectType,
      statusComments,
    } = this.state;

    const contact = {
      name: contactName,
      org: contactOrg,
      position: contactPosition,
      phone: contactPhone,
      email: contactEmail,
    };

    const general = {
      name: generalName,
      objective: generalObjective,
      dates: generalDates,
      background: generalBackground,
    };

    const detail = {
      descriptiopn: detailDescription,
      optionalRequirements: detailOptionalRequirements,
      requirements: detailRequirements,
    };

    const status = {
      isUserApproved: statusUserApproved,
      isITApproved: statusITApproved,
      hasBudget: statusBudget,
      projectType: statusProjectType,
      comments: statusComments,
    };

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
    const {
      contactName,
      contactOrg,
      contactPosition,
      contactPhone,
      contactEmail,
      generalName,
      generalObjective,
      generalDates,
      generalBackground,
      detailDescription,
      detailOptionalRequirements,
      detailRequirements,
      statusUserApproved,
      statusITApproved,
      statusBudget,
      statusProjectType,
      statusComments,
    } = this.state;

    return (
      <div className='box'>
        <Form title='Consulta personalizada' onSubmit={this.handleSubmit}>
          <FormSubTitle subtitle='Datos de Contacto' />
          <FormInput
            type='text'
            name='contactName'
            value={contactName}
            onChange={this.handleChange}
            label='Nombre de la persona'
            required
          />
          <FormInput
            type='text'
            name='contactOrg'
            value={contactOrg}
            onChange={this.handleChange}
            label='Nombre de la organización'
            required
          />
          <FormInput
            type='text'
            name='contactPosition'
            value={contactPosition}
            onChange={this.handleChange}
            label='Posición'
            required
          />
          <FormInput
            type='text'
            name='contactPhone'
            value={contactPhone}
            onChange={this.handleChange}
            label='Teléfono'
            required
          />
          <FormInput
            type='email'
            name='contactEmail'
            value={contactEmail}
            onChange={this.handleChange}
            label='Correo electrónico'
            required
          />

          <FormSubTitle subtitle='General' />
          <FormTextarea
            type='text'
            name='generalName'
            value={generalName}
            onChange={this.handleChange}
            label='Nombre de la necesidad'
            required
          />
          <FormTextarea
            type='text'
            name='generalObjective'
            value={generalObjective}
            onChange={this.handleChange}
            label='Objetivo'
            required
          />
          <FormInput
            type='text'
            name='generalDates'
            value={generalDates}
            onChange={this.handleChange}
            label='Fechas relevantes'
            required
          />
          <FormTextarea
            type='text'
            name='generalBackground'
            value={generalBackground}
            onChange={this.handleChange}
            label='Antecedentes [Problemática actual]'
            required
          />

          <FormSubTitle subtitle='Detalle' />
          <FormTextarea
            type='text'
            name='detailDescription'
            value={detailDescription}
            onChange={this.handleChange}
            label='Descripcion de la necesidad'
            required
          />
          <FormTextarea
            type='text'
            name='detailOptionalRequirements'
            value={detailOptionalRequirements}
            onChange={this.handleChange}
            label='Listado de requerimientos (opcional)'
          />
          <FormTextarea
            type='text'
            name='detailRequirements'
            value={detailRequirements}
            onChange={this.handleChange}
            label='Requerimientos obligatorios'
            required
          />
          <FormSubTitle subtitle='Estatus de la necesidad' />
          {/*TODO: Consider changing the following 3 FormSelects to Radio buttons.*/}
          <FormSelect
            type='text'
            name='statusUserApproved'
            value={statusUserApproved}
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
            name='statusITApproved'
            value={statusITApproved}
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
            value={statusBudget}
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
            value={statusProjectType}
            onChange={this.handleChange}
            label='Tipo de Proyecto'
            required
          />
          <FormTextarea
            type='text'
            name='statusComments'
            value={statusComments}
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
