import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { FormInput, FormTextarea } from '../form-input/form-input.component';
import { Notification } from '../notifications/notification.component';
import { Button } from '@material-ui/core';

import { firestore as db } from '../../firebase/firebase';

import './solution-form.styles.scss';
import { firestore } from 'firebase';

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

    db.collection('users')
      .doc(this.props.currentUser.id)
      .update({
        solutions: firestore.FieldValue.arrayUnion({
          solutionName,
          descriptionPitch,
          descriptionSuccess,
          price,
        }),
      });

    // Después cambiamos esto a /soluciones o algo distinto
    this.props.history.push('/');
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

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

export default connect(mapStateToProps)(withRouter(SolutionForm));
