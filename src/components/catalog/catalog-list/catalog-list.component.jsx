import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import CategoryList from '../category-list/category-list.component';
import SearchBar from '../search-bar/search-bar.component';
import CButton from '../../elements/c-button/c-button.component';
import CatalogSolutionList from '../catalog-solution-list/catalog-solution-list.component';

import './catalog-list.styles.scss';

const CatalogList = ({ data }) => {
  let history = useHistory();
  const { selectedCategory, selectedSubcategory } = useParams();

  const [searchQuery, setSearchQuery] = React.useState('');
  const [page, setPage] = React.useState(1);

  // TODO: When selectedSubcategory is null, display all matching solutions.
  // Currently, list is empty.

  // We must return to the first page whenever there's a new search or category request.
  React.useEffect(() => setPage(1), [
    selectedCategory,
    selectedSubcategory,
    searchQuery,
  ]);
  const getSolutions = React.useCallback(() => {
    const matchInArray = (string, expressions) => {
      for (var i = 0; i < expressions.length; i++) {
        if (expressions[i].toLowerCase().includes(string.toLowerCase())) {
          return true;
        }
      }
      return false;
    };

    var categorySolutions = [];
    if (selectedCategory === 'todas') {
      categorySolutions = data;
    } else {
      for (let x = 0; x < data.length; x++) {
        if (data[x].category === selectedSubcategory) {
          categorySolutions.push(data[x]);
        }
      }
    }

    if (searchQuery !== '') {
      var searchSolutions = [];
      for (var x = 0; x < categorySolutions.length; x++) {
        const sol = categorySolutions[x];
        if (
          matchInArray(searchQuery, [
            sol.solutionName,
            sol.descriptionPitch,
            sol.descriptionSuccess,
            sol.organization,
          ])
        ) {
          searchSolutions.push(sol);
        }
      }
      return searchSolutions;
    } else {
      return categorySolutions;
    }
  }, [data, selectedCategory, selectedSubcategory, searchQuery]);

  const selectSubcategory = (subcategory) => {
    history.push(`/catalogo/${subcategory}`);
  };

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <div className='filters'>
            <h4 className='search-label'>Búsqueda y filtros:</h4>
            <SearchBar setSearchQuery={setSearchQuery} />
            <CategoryList selectSubcategory={selectSubcategory} />
            <div className='custom-inquiry'>
              <center>
                <p>
                  ¿No encuentras lo que buscabas?
                  <CButton
                    text='Envíanos una consulta personalizada'
                    color='orange'
                    onClick={() => history.push('/custom-inquiry')}
                  />
                </p>
              </center>
            </div>
          </div>
        </Grid>
        <Grid item xs={8}>
          <CatalogSolutionList
            solutions={getSolutions() || data}
            page={page}
            setPage={setPage}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CatalogList;
