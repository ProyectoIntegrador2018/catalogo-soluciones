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
          count={Math.ceil(solutions.length / 10)}
          variant='outlined'
          color='primary'
          page={state.page}
          onChange={handleChange}
        />
      </span></center>
      
      <div className='solutions'>
        {solutions.slice((state.page - 1) * 10, (state.page - 1) * 10 + 10)
          .map((solution, _) => (
            <CatalogSolutionItem solution={solution} />
          ))}
      </div>
      
      <center><span className='page-text'>
        Página: &nbsp;
        <Pagination
          className='pagination'
          count={Math.ceil(solutions.length / 10)}
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