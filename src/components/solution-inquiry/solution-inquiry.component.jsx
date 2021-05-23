import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { setNotification } from '../../redux/notification/notification.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { creatNewEnquiry } from '../../firebase/enquiries';

import {
  Form,
  FormSubTitle,
  FormInput,
  FormTextarea,
} from '../form/form.component';
import { Button, CircularProgress } from '@material-ui/core';

import './solution-inquiry.styles.scss';

class SolutionInquiry extends React.Component {
  constructor(props) {
    super(props);

    if (
      !this.props.location.state ||
      !this.props.location.state.toEmail ||
      !this.props.location.state.solutionName ||
      !this.props.location.state.solutionId ||
      !this.props.location.state.orgName ||
      !this.props.location.state.organizationID
    ) {
      this.state = { shouldRender: false };
      this.props.history.push('/');
    } else {
      this.state = {
        shouldRender: true,
        toEmail: this.props.location.state.toEmail,
        solutionName: this.props.location.state.solutionName,
        solutionId: this.props.location.state.solutionId,
        orgName: this.props.location.state.orgName,
        organizationID: this.props.location.state.organizationID,
        message: '',

        loading: false,
      };
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const {
      message,
      toEmail,
      organizationID,
      orgName,
      solutionName,
      solutionId,
    } = this.state;

    const { setNotification, currentUser } = this.props;

    const { id, orgName: enquiringOrg, email, displayName } = currentUser || {};

    if (!enquiringOrg || !email || !displayName) {
      setNotification({
        severity: 'warning',
        message: 'Error al enviar mensaje. Intente nuevamente.',
      });
    }

    this.setState({ loading: true });

    creatNewEnquiry({
      organizationID,
      contactID: id,
      toEmail,
      fromEmail: email,
      orgName,
      service: solutionName,
      serviceId: solutionId,
      name: displayName,
      enquiringOrg,
      message,
    })
      .then(() => {
        this.setState({ loading: false });
        setNotification({
          severity: 'info',
          message:
            'Se ha enviado el mensaje. Pronto recibiras una respuesta por correo.',
        });
        this.props.history.push('/');
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false });
        setNotification({
          severity: 'warning',
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
      solutionName,
      orgName,
      message,
      loading,
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
            <FormTextarea
              type='text'
              name='message'
              value={message}
              onChange={this.handleChange}
              label='Su mensaje'
              required
            />

            <Button variant='contained' color='primary' type='submit'>
              {loading ? (
                <CircularProgress color='inherit' />
              ) : (
                'Enviar mensaje'
              )}
            </Button>
          </Form>
        </div>
      )
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setNotification: (notification) => dispatch(setNotification(notification)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SolutionInquiry));
