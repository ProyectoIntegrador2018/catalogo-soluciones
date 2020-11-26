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
  FormFile,
} from '../../form/form.component';
import CButton from '../../elements/c-button/c-button.component';
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
        solutionFlyer: this.props.solution.flyer,
        reciprocity: this.props.solution.reciprocity,
      };
    } else {
      this.state = {
        solutionName: '',
        descriptionPitch: '',
        descriptionSuccess: '',
        price: '',
        category: '',
        solutionFlyer: '',
        reciprocity: '',
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
      solutionFlyer,
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
          solutionFlyer,
        },
        this.props.solution.id,
        this.props.currentUser.id,
      );
      const solutionToEdit = {
        id: this.props.solution.id,
        solutionName,
        descriptionPitch,
        descriptionSuccess,
        price,
        category,
        solutionFlyer,
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
        solutionFlyer,
      };
      const newSolutionId = await insertNewSolution(
        newSolution,
        this.props.currentUser.orgName,
      );
      const { addSolution } = this.props;
      newSolution.id = newSolutionId;
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

  handleFile = (event) => {
    const { name } = event.target;

    this.setState({ [name]: event.target.files[0] });
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
      solutionFlyer,
      reciprocity,
    } = this.state;

    return (
      <Form
        title={
          this.props.solution
            ? 'Ver / Modificar Solución'
            : 'Crear nueva solución'
        }
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
          label='(Opcional) Descripción de casos de éxito previos de la solución (max. 500 caracteres)'
          rows={10}
        />
        <FormTextarea
          type='text'
          name='price'
          value={price}
          onChange={this.handleChange}
          label='Explicación del esquema de precios para la solución'
          rows={3}
          required
        />
        <FormTextarea
          type='text'
          name='reciprocity'
          value={reciprocity}
          onChange={this.handleChange}
          label='(Opcional) Porcentaje de reciprocidad al clúster.'
          rows={3}
        />
        <FormFile
          name='solutionFlyer'
          onChange={this.handleFile}
          label='(Opcional) Flyer de la solución en formato jpeg o png.'
          accept='image/jpeg, image/png'
        />
        {this.props.solution && solutionFlyer && (
          <img src={solutionFlyer} className='edit-flyer' alt='flyer' />
        )}
        <CButton
          text={this.props.solution ? 'Guardar cambios' : 'Crear solución'}
          color='orange'
          type='submit'
        />
        &nbsp;&nbsp;
        {this.props.solution ? (
          <CButton
            text='Cerrar'
            color='grey'
            onClick={() => this.props.history.push('panel-org-x')}
          />
        ) : null}
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
