/* eslint-disable global-require */
/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import io from 'socket.io-client';

import rootReducer from './reducers/reducers';


const socketAddr = process.env.NODE_ENV === 'production' ?
  window.location.origin :
  `${window.location.hostname}:${process.env.PORT}`;

const socket = io(socketAddr);


const store = createStore(rootReducer);

const render = () => {
  const App = require('./App').default;

  ReactDOM.render(
    <App
      store={store}
      socket={socket}
    />,
    document.getElementById('app')
  );
};

if (module.hot) {
  // Support hot reloading of components
  module.hot.accept('./App', () => {
    render();
  });
}

render();

