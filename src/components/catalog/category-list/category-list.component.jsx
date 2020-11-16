import React from 'react';

import { Collapse, List, ListItem, ListItemIcon, ListItemText, Paper } from '@material-ui/core';
import SOLUTION_CATEGORIES from '../../../constants/solution-categories';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const CategoryList = ({ selectSubcategory }) => {
  const [state, setState] = React.useState({
    selectedCategory: '',
    selectedSubcategory: 'Todas las categorías'
  });

  const setCategory = (category) => {
    if (category === state.selectedCategory) {
      setState({...state, selectedCategory: ''})
    } else {
      setState({...state, selectedCategory: category})
    }
  }

  const setSubcategory = (subcategory) => {
    setState({...state, selectedSubcategory: subcategory});
    selectSubcategory(subcategory);
  }

  return (
    <Paper>
      <List component='nav'>
        <ListItem 
          button 
          selected={state.selectedSubcategory === 'Todas las categorías'}
          onClick={() => setSubcategory('Todas las categorías')}
        >
          <ListItemText 
            className={state.selectedSubcategory === 'Todas las categorías' ? 'orange' : ''} 
            primary='Ver todas las categorías' 
          />
        </ListItem>
        {
          Object.keys(SOLUTION_CATEGORIES).map((category, _) => (
            <span>
              <ListItem 
                button
                onClick={() => setCategory(category)}
              >
                <ListItemIcon>
                  {category === state.selectedCategory ? <ExpandLess /> :
                    <ExpandMore />}
                </ListItemIcon>
                <ListItemText primary={category} />
              </ListItem>
              <Collapse 
                in={category === state.selectedCategory} 
                timeout="auto" unmountOnExit
              >
                <List component='div' disablePadding>
                  {
                    SOLUTION_CATEGORIES[category].map((subcategory, _) => (
                      <ListItem
                        button
                        selected={subcategory === state.selectedSubcategory}
                        onClick={() => setSubcategory(subcategory)}
                      >
                        <ListItemIcon></ListItemIcon>
                        <ListItemText 
                          className={subcategory === state.selectedSubcategory ? 'orange' : ''}
                          primary={subcategory} 
                        />
                      </ListItem>
                    ))
                  }
                </List>
              </Collapse>
            </span>
          ))
        }
      </List>
    </Paper>
  );
};

export default CategoryList;