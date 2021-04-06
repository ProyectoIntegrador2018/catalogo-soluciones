import { createStore } from 'redux';

import rootReducer from './root-reducer';

// Configured to enable redux's Devtools chrome extension, which facilitates debugging.
// https://github.com/zalmoxisus/redux-devtools-extension#usage
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
