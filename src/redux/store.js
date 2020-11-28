import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

// If you want to log the redux actions, remove this comment.
// const middlewares = [logger];
// Comment this line if you remove the comment from the previous line.
const middlewares = [];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
