import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import mainReducer from './reducers/main-reducer';

const reducers = {
  mainReducer
};

const app = combineReducers(reducers);

const store = createStore(
  app,
  applyMiddleware(
    thunkMiddleware
  )
);

export default store;
