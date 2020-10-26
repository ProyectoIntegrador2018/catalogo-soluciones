import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import organizationsReducer from './organizations/organizations.reducer';
import solutionsReducer from './solutions/solutions.reducer';

export default combineReducers({
  user: userReducer,
  organizations: organizationsReducer,
  solutions: solutionsReducer,
});
