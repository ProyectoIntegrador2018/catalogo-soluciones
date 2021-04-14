import React from 'react';

import { useHistory, useParams } from 'react-router-dom';
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@material-ui/core';
import SOLUTION_CATEGORIES from '../../../constants/solution-categories';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const CategoryList = ({ selectSubcategory }) => {
  const { selectedCategory, selectedSubcategory } = useParams();
  const history = useHistory();

  const setCategory = (category) => {
    if (category === 'todas' || category === selectedCategory) {
      history.push(`/catalogo/todas/`);
    } else {
      history.push(`/catalogo/${category}/${selectedSubcategory || ''}`);
    }
  };

  const setSubcategory = (subcategory) => {
    history.push(`/catalogo/${selectedCategory}/${subcategory}`);
  };

  return (
    <Paper>
      <List component='nav'>
        <ListItem
          button
          selected={selectedCategory === 'todas'}
          onClick={() => setCategory('todas')}
        >
          <ListItemText
            className={selectedCategory === 'todas' ? 'orange' : ''}
            primary='Ver todas las categorías'
          />
        </ListItem>
        {Object.keys(SOLUTION_CATEGORIES).map((category, _) => (
          <span>
            <ListItem button onClick={() => setCategory(category)}>
              <ListItemIcon>
                {category === selectedCategory ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItemIcon>
              <ListItemText primary={category} />
            </ListItem>
            <Collapse
              in={category === selectedCategory}
              timeout='auto'
              unmountOnExit
            >
              <List component='div' disablePadding>
                {SOLUTION_CATEGORIES[category].map((subcategory, _) => (
                  <ListItem
                    button
                    selected={subcategory === selectedSubcategory}
                    onClick={() => setSubcategory(subcategory)}
                  >
                    <ListItemIcon></ListItemIcon>
                    <ListItemText
                      className={
                        subcategory === selectedSubcategory ? 'orange' : ''
                      }
                      primary={subcategory}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </span>
        ))}
      </List>
    </Paper>
  );
};

export default CategoryList;
