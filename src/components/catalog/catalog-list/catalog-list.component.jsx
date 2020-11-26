import React from 'react';
import { useHistory } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import CategoryList from '../category-list/category-list.component';
import SearchBar from '../search-bar/search-bar.component';
import CButton from '../../elements/c-button/c-button.component';
import CatalogSolutionList from '../catalog-solution-list/catalog-solution-list.component';

import './catalog-list.styles.scss';

const CatalogList = ({ data }) => {
  let history = useHistory();

  const [state, setState] = React.useState({
    searchQuery: '',
    selectedSubcategory: 'Todas las categorías',
    solutions: data,
    page: 1,
  });

  const matchInArray = (string, expressions) => {
    for (var i = 0; i < expressions.length; i++) {
        if (expressions[i].toLowerCase().includes(string.toLowerCase())) {
            return true;
        }
    }
    return false;
  }

  const applyFilters = (query, subcategory) => {
    var categorySolutions = [];
    if (subcategory === 'Todas las categorías') {
      categorySolutions = data;
    } else {
      for (let x = 0; x < data.length; x++) {
        if (data[x].category === subcategory) {
          categorySolutions.push(data[x]);
        }
      }
    }

    if (query !== '') {
      var searchSolutions = [];
      for (var x = 0; x < categorySolutions.length; x++) {
        const sol = categorySolutions[x];
        if (matchInArray(query, [
          sol.solutionName, 
          sol.descriptionPitch, 
          sol.descriptionSuccess, 
          sol.organization
        ])) {
          searchSolutions.push(sol);
        }
      }
      return searchSolutions;
    } else {
      return categorySolutions;
    }
  }

  const selectSubcategory = (subcategory) => {
    var newSolutions = applyFilters(state.searchQuery, subcategory);
    setState({
      ...state, 
      selectedSubcategory: subcategory,
      solutions: newSolutions,
      page: 1,
    });
  }

  const setSearchQuery = (query) => {
    var newSolutions = applyFilters(query, state.selectedSubcategory);
    setState({
      ...state, 
      searchQuery: query,
      solutions: newSolutions,
      page: 1,
    });
  }

  const setPage = (p) => {
    setState({...state, page:p});
  }

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <div className='filters'>
            <h4 className='search-label'>Búsqueda y filtros:</h4>
            <SearchBar setSearchQuery={setSearchQuery} />
            <CategoryList selectSubcategory={selectSubcategory} />
            <div className='custom-inquiry'>
              <center><p>
                ¿No encuentras lo que buscabas?
                <CButton
                  text='Envíanos una consulta personalizada'
                  color='orange'
                  onClick={() => history.push('custom-inquiry')}
                />
              </p></center>   
            </div>
          </div>
        </Grid>
        <Grid item xs={8}>
          <CatalogSolutionList 
            solutions={state.solutions || data} 
            page={state.page}
            setPage={setPage}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default CatalogList;