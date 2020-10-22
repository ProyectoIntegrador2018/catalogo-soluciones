import React from 'react';

import NewSolutionItem from '../new-solution-item/new-solution-item.component';

import './new-solution-list.styles.scss';

const NewSolutionList = ({ newSolutions }) => {
  return (
    <div className='new-solutions-list'>
      <h1>Nuevas solicitudes de soluciones</h1>
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
          <span>Aceptar</span>
        </div>
        <div className='header-action-button'>
          <span>Rechazar</span>
        </div>
      </div>
      {newSolutions.map((value, index) => {
        return <NewSolutionItem key={index} newSolution={value} />;
      })}
    </div>
  );
};

export default NewSolutionList;