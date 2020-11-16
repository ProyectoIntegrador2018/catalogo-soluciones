import React from 'react';

import NewSolutionItem from '../new-solution-item/new-solution-item.component';

import './new-solution-list.styles.scss';

const NewSolutionList = ({ newSolutions }) => {
  return (
    <div className='new-solutions-list'>
      <h1>Solicitudes de nuevas soluciones</h1>
      {
        newSolutions.length > 0 ?
          <div className='new-solutions-header'>
            <div className='header-block'>
              <span>Organización</span>
            </div>
            <div className='header-block'>
              <span>Solución</span>
            </div>
            <div className='header-block-small'>
              <span>Precio</span>
            </div>
            <div className='header-action-button'>
              <span>Acción</span>
            </div>
          </div>
        :
          <center><h3>
            No hay solicitudes pendientes.
          </h3></center>
      }
      {newSolutions.map((value, index) => {
        return <NewSolutionItem key={index} newSolution={value} />;
      })}
    </div>
  );
};

export default NewSolutionList;
