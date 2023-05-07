import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import myStickies from './mystickies';
import allStickies from './allstickies';

const reducer = combineReducers({
  auth,
  myStickies,
  allStickies
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './mystickies';
export * from './allstickies';
