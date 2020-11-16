import React from 'react';

import { IconButton, InputBase, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import './search-bar.styles.scss';

const SearchBar = ({ setSearchQuery }) => {
  const [state, setState] = React.useState({
    searchQuery: '',
  });

  const handleChange = (event) => {
    setState({...state, searchQuery: event.target.value});
    setSearchQuery(event.target.value);
  }

  return (
    <Paper className='search-box' variant='outlined'>
      <InputBase 
        className='text-input' 
        placeholder='Búsqueda' 
        type='text'
        value={state.searchQuery}
        onChange={handleChange}
      />
      <IconButton 
        type="submit" 
        onClick={() => setSearchQuery(state.searchQuery)}
      >
        <SearchIcon className='search-icon' />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;