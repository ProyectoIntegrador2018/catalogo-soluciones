import React from 'react';

import SolutionItem from '../solution-item/solution-item.component';

import './solution-list.styles.scss';

const SolutionList = ({ solutions }) => {
  return (
    <div className='solutions-list'>
      <h1>Mis soluciones</h1>
      <div className='solutions-header'>
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
      {solutions.map((value, index) => {
        return <SolutionItem key={index} solution={value} />;
      })}
    </div>
  );
};

export default SolutionList;
