import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { setNotification } from '../../../redux/notification/notification.actions';

import {
  Form,
  FormInput,
  FormTextarea,
  FormSelect,
  FormOption,
} from '../../form/form.component';
import { Button } from '@material-ui/core';
import { selectCurrentUser } from '../../../redux/user/user.selectors';

import { insertNewSolution, updateSolution } from '../../../firebase/catalog';

import './solution-form.styles.scss';
import {
  modifySolution,
  addSolution,
} from '../../../redux/solutions/solutions.actions';

import SOLUTION_CATEGORIES from '../../../constants/solution-categories';

class SolutionForm extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.solution) {
      this.state = {
        solutionName: this.props.solution.solutionName,
        descriptionPitch: this.props.solution.descriptionPitch,
        descriptionSuccess: this.props.solution.descriptionSuccess,
        price: this.props.solution.price,
        category: this.props.solution.category,
      };
    } else {
      this.state = {
        solutionName: '',
        descriptionPitch: '',
        descriptionSuccess: '',
        price: '',
        category: '',
      };
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const {
      solutionName,
      descriptionPitch,
      descriptionSuccess,
      price,
      category,
    } = this.state;

    const { setNotification } = this.props;

    if (price < 0) {
      setNotification({ severity: 'error', message: 'Precio inválido' });
      return;
    }

    if (descriptionPitch.length > 500 || descriptionSuccess.length > 500) {
      setNotification({
        severity: 'error',
        message: 'La longitud de la descripción es mayor a 500 caracteres.',
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
          category,
        },
        this.props.solution.id,
      );
      const solutionToEdit = {
        id: this.props.solution.id,
        solutionName,
        descriptionPitch,
        descriptionSuccess,
        price,
        category,
      };
      const { modifySolution } = this.props;
      modifySolution(solutionToEdit);
      // Update solution in state.
    } else {
      const newSolution = {
        organizationID: this.props.currentUser.id,
        approved: false,
        solutionName,
        descriptionPitch,
        descriptionSuccess,
        price,
        category,
      };
      const res = await insertNewSolution(
        newSolution,
        this.props.currentUser.orgName,
      );
      const { addSolution } = this.props;
      newSolution.id = res.id;
      addSolution(newSolution);
      setNotification({
        severity: 'info',
        message: 
          'Se ha guardado la solución. Una vez que sea revisada por CSOFTMTY se mostrará en el catálogo.',
      });
      // Add solution to state.
    }
    this.props.history.push('panel-org-x');
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleChangeMultiple = (event) => {
    console.log(event.target);
    const options = event.target.value;
    console.log(options);
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({ categories: this.state.categories.push(value) });
  };

  render() {
    const {
      solutionName,
      descriptionPitch,
      descriptionSuccess,
      price,
      category,
    } = this.state;
    return (
      <Form
        title={this.props.solution ? 'Ver / Modificar Solución' : 'Crear nueva solución'}
        onSubmit={this.handleSubmit}
      >
        <FormInput
          type='text'
          name='solutionName'
          value={solutionName}
          onChange={this.handleChange}
          label='Nombre de la solución'
          required
        />
        <FormSelect
          type='text'
          name='category'
          value={category}
          onChange={this.handleChange}
          label='Categoría'
          required
        >
          <FormOption value='' label='' disabled hidden />
          {Object.keys(SOLUTION_CATEGORIES).map((category, _) => (
            <optgroup label={category}>
              {SOLUTION_CATEGORIES[category].map((subcategory, _) => (
                <FormOption value={subcategory} label={subcategory} />
              ))}
            </optgroup>
          ))}
        </FormSelect>
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
          {this.props.solution ? 'Guardar cambios' : 'Crear solución'}
        </Button>
          &nbsp;&nbsp;
        {this.props.solution ?
          <Button variant='contained' color='secondary'
            onClick={() => this.props.history.push('panel-org-x')}
          >
            Cerrar
            </Button>
          : null}
      </Form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  modifySolution: (solution) => dispatch(modifySolution(solution)),
  addSolution: (solution) => dispatch(addSolution(solution)),
  setNotification: (notification) => dispatch(setNotification(notification)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SolutionForm));