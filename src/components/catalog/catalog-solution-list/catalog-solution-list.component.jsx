import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Pagination } from '@material-ui/lab';
import CatalogSolutionItem from '../catalog-solution-item/catalog-solution-item.component';
import CButton from '../../elements/c-button/c-button.component';

import './catalog-solution-list.styles.scss';

const CatalogSolutionList = ({ solutions, page, setPage, currentUser }) => {
  let history = useHistory();

  const handleChange = (event, value) => {
    setPage(value)
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
          page={page}
          onChange={handleChange}
        />
      </span></center>

      <div className='solutions'>
        {solutions.length ? 
          <span>
            {solutions.slice((page - 1) * 5, (page - 1) * 5 + 5)
              .map((solution, _) => (
                <CatalogSolutionItem 
                  solution={solution} 
                  currentUser={currentUser}
                />
              ))}
          </span>
        :  
        <div><center>
          <h3>No hay soluciones para mostrar.</h3>
          <h4>Intenta eliminar algunos filtros.</h4>
          <br></br>
          <p>
            ¿No encuentras lo que buscabas? <br></br>
            <CButton
              text='Envíanos una consulta personalizada'
              color='orange'
              onClick={() => history.push('custom-inquiry')}
            />
          </p>
        </center></div>
        }
      </div>
      
      <center><span className='page-text'>
        Página: &nbsp;
        <Pagination
          className='pagination'
          count={Math.ceil(solutions.length / 5)}
          variant='outlined'
          color='primary'
          page={page}
          onChange={handleChange}
        />
      </span></center>
    </div>
  );
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

export default connect(mapStateToProps)(CatalogSolutionList);
