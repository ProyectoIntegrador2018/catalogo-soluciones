import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { setCurrentUser } from '../../../redux/user/user.actions';
import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { setNotification } from '../../../redux/notification/notification.actions';

import { updateOrg } from '../../../firebase/sessions';

import CButton from '../../elements/c-button/c-button.component';
import {
  Form,
  FormInput,
  FormSelect,
  FormOption,
  FormTextarea,
  FormFile,
} from '../../form/form.component';

import './edit-org-form.styles.scss';

const EditOrgForm = ({ currentUser, setCurrentUser, setNotification }) => {
  let history = useHistory();

  const [state, setState] = React.useState({
    orgName: currentUser.orgName,
    orgType: currentUser.orgType,
    description: currentUser.description,
    orgLogo: currentUser.logo,
    newOrgLogo: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState({ ...state, [name]: value });
  };

  const handleFile = (event) => {
    const { name } = event.target;

    setState({ ...state, [name]: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    updateOrg(state, currentUser.id)
      .then((url) => {
        currentUser.orgName = state.orgName;
        currentUser.orgType = state.orgType;
        currentUser.description = state.description;
        currentUser.logo = url ? url : state.orgLogo;
        setCurrentUser(currentUser);

        setNotification({
          severity: 'info',
          message: 'Se guardaron los cambios con éxito.',
        });
        history.push('panel-org-x');
      })
      .catch(() => {
        setNotification({
          severity: 'error',
          message: 'Error, intente nuevamente.',
        });
      });
  };

  return (
    <Form title='Detalles de la organización' onSubmit={handleSubmit}>
      <FormInput
        type='text'
        name='orgName'
        value={state.orgName}
        onChange={handleChange}
        label='Nombre de la organización'
        required
      />
      <FormSelect
        type='text'
        name='orgType'
        value={state.orgType}
        onChange={handleChange}
        label='Tipo de organización'
        required
      >
        <FormOption value='' label='' disabled hidden />
        <FormOption value='micro' label='Micro' />
        <FormOption value='pequeña' label='Pequeña' />
        <FormOption value='mediana' label='Mediana' />
        <FormOption value='grande' label='Grande' />
      </FormSelect>
      <FormTextarea
        type='text'
        name='description'
        value={state.description}
        onChange={handleChange}
        label='Describe tu organización. Esto será mostrado a los usuarios del catálogo.'
        required
      />
      <img
        className='org-logo'
        src={state.orgLogo}
        alt='Logotipo'
        width='200'
      />
      <FormFile
        name='newOrgLogo'
        onChange={handleFile}
        label='Modificar logotipo de la organización'
        accept='image/jpeg, image/jpg, image/png'
      />

      <CButton text='Guardar cambios' color='orange' type='submit' />
    </Form>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setNotification: (notification) => dispatch(setNotification(notification)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditOrgForm);
