import React from 'react';

import { Pagination } from '@material-ui/lab';
import CatalogSolutionItem from '../catalog-solution-item/catalog-solution-item.component';

import './catalog-solution-list.styles.scss';

const CatalogSolutionList = ({ solutions }) => {
  const [state, setState] = React.useState({
    page: 1,
  });

  const handleChange = (event, value) => {
    setState({ ...state, page: value });
  }

  return solutions && (
    <div className='solutions-container'>
      <center><span className='page-text'>
        Página: &nbsp;
        <Pagination
          className='pagination'
          count={Math.ceil(solutions.length / 5)}
          variant='outlined'
          color='primary'
          page={state.page}
          onChange={handleChange}
        />
      </span></center>

      <div className='solutions'>
        {solutions.length ? 
          <span>
            {solutions.slice((state.page - 1) * 5, (state.page - 1) * 5 + 5)
              .map((solution, _) => (
                <CatalogSolutionItem solution={solution} />
              ))}
          </span>
        :  
          <center>
            <h3>No hay soluciones para mostrar.</h3>
            <h4>Intenta eliminar algunos filtros.</h4>
          </center>
        }
      </div>
      
      <center><span className='page-text'>
        Página: &nbsp;
        <Pagination
          className='pagination'
          count={Math.ceil(solutions.length / 5)}
          variant='outlined'
          color='primary'
          page={state.page}
          onChange={handleChange}
        />
      </span></center>
    </div>
  );
}

export default CatalogSolutionList;