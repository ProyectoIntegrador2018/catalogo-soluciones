import React from 'react';
import { withRouter } from 'react-router-dom';

import { FormInput } from '../form-input/form-input.component';
import { Notification } from '../notifications/notification.component';
import { Button } from '@material-ui/core';

import './solution-form.styles.scss';

class SolutionForm extends React.Component {
  constructor() {
    super();

    this.state = {
      solutionName: '',
      descriptionPitch: '',
      descriptionSuccess: '',
      logo: '',
      flyer: '',
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
      solutionName,
      descriptionPitch,
      descriptionSuccess,
      price,
      errorMssg,
    } = this.state;
    return (
      <div className='content-solution-form'>
        <div className='solution-form'>
          <h2 className='title'>Agrega una nueva solución</h2>
          <form onSubmit={this.handleSubmit}>
            <FormInput
              type='text'
              name='solutionName'
              value={solutionName}
              onChange={this.handleChange}
              label='Nombre de la solución'
              required
            />
            <FormInput
              type='text'
              name='descriptionPitch'
              value={descriptionPitch}
              onChange={this.handleChange}
              label='Descripción de la solución (max. 500 caracteres)'
              required
            />
            <FormInput
              type='text'
              name='descriptionSuccess'
              value={descriptionSuccess}
              onChange={this.handleChange}
              label='Descripción de casos de éxito previos de la solución (max. 500 caracteres)'
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
            <Notification
              severity='error'
              mssg={errorMssg}
              onClose={this.handleClose}
            />
            <Button variant='contained' color='primary' type='submit'>
              Crear
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SolutionForm);
