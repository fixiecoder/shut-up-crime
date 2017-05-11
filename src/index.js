import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import store from './store';
import MainContainer from './containers/main-container';

ReactDOM.render(
  <Provider store={store}>
    <MainContainer />
  </Provider>, document.getElementById('root')
);
