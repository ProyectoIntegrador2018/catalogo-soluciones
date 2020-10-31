import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { Form, FormInput, FormTextarea } from '../form/form.component';
import Notification from '../notifications/notification.component';
import { Button } from '@material-ui/core';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { insertNewSolution, updateSolution } from '../../firebase/catalog';

import './solution-form.styles.scss';

class SolutionForm extends React.Component {
  constructor() {
    super();

    this.state = {
      solutionName: '',
      descriptionPitch: '',
      descriptionSuccess: '',
      price: '',
      errorMssg: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const {
      solutionName,
      descriptionPitch,
      descriptionSuccess,
      price,
    } = this.state;

    if (price < 0) {
      this.setState({ errorMssg: 'Precio inválido.' });
      return;
    }

    if (descriptionPitch.length > 500 || descriptionSuccess.length > 500) {
      this.setState({
        errorMssg: 'La longitud de la descripción es mayor a 500 caracteres.',
      });
      return;
    }

    if (this.props.solution) {
      updateSolution(
        {
          solutionName,
          descriptionPitch,
          descriptionSuccess,
          price,
        },
        this.props.solution.id,
      );
    } else {
      insertNewSolution(
        {
          organizationID: this.props.currentUser.id,
          approved: false,
          solutionName,
          descriptionPitch,
          descriptionSuccess,
          price,
        },
        this.props.currentUser.orgName,
      );
    }

    this.props.history.push('/catalogo');
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

  componentDidMount() {
    if (this.props.solution) {
      this.setState({
        solutionName: this.props.solution.solutionName,
        descriptionPitch: this.props.solution.descriptionPitch,
        descriptionSuccess: this.props.solution.descriptionSuccess,
        price: this.props.solution.price,
      });
    }
  }

  render() {
    const {
      solutionName,
      descriptionPitch,
      descriptionSuccess,
      price,
      errorMssg,
    } = this.state;
    if (this.props.currentUser.approved) {
      return (
        <Form title='Agregar nueva solución' onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='solutionName'
            value={solutionName}
            onChange={this.handleChange}
            label='Nombre de la solución'
            required
          />
          <FormTextarea
            type='text'
            name='descriptionPitch'
            value={descriptionPitch}
            onChange={this.handleChange}
            label='Descripción de la solución (max. 500 caracteres)'
            rows={10}
            required
          />
          <FormTextarea
            type='text'
            name='descriptionSuccess'
            value={descriptionSuccess}
            onChange={this.handleChange}
            label='Descripción de casos de éxito previos de la solución (max. 500 caracteres)'
            rows={10}
            required
          />
          <FormInput
            type='number'
            name='price'
            value={price}
            onChange={this.handleChange}
            label='Precio'
            required
          />

          <Button variant='contained' color='primary' type='submit'>
            {this.props.solution ? 'Guardar' : 'Crear'}
          </Button>

          <Notification
            severity='error'
            mssg={errorMssg}
            onClose={this.handleClose}
          />
        </Form>
      );
    } else {
      // TODO: Arreglar el estilo de este bloque.
      return (
        <div className='unapproved-account'>
          Tu cuenta aún no ha sido aprobada. Ponérse en contacto con el
          administrador para dar seguimiento a su solicitud.
        </div>
      );
    }
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(withRouter(SolutionForm));
