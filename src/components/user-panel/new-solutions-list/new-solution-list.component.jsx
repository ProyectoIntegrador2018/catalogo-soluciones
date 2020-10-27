import React from 'react';

import NewSolutionItem from '../solution-item/solution-item.component';

import './new-solution-list.styles.scss';

const NewSolutionList = ({ newSolutions }) => {
  return (
    <div className='new-solutions-list'>
      <h1>Solicitudes de nuevas soluciones</h1>
      <div className='new-solutions-header'>
        <div className='header-block'>
          <span>Organizacion</span>
        </div>
        <div className='header-block'>
          <span>Solucion</span>
        </div>
        <div className='header-block-small'>
          <span>Precio</span>
        </div>
        <div className='header-action-button'>
          <span>Accion</span>
        </div>
      </div>
      {newSolutions.map((value, index) => {
        return <NewSolutionItem key={index} newSolution={value} />;
      })}
    </div>
  );
};

export default NewSolutionList;
