import React from 'react';
import { useLocation } from 'react-router-dom';

import SolutionForm from '../../components/solution-form/solution-form.component';

import './editar-solucion.styles.scss';

const EditSolutionPage = () => {
  const location = useLocation();
  const solution = location.state;

  return (
    <div className='edit-solution'>
      <SolutionForm solution={solution} />
    </div>
  );
};

export default EditSolutionPage;
