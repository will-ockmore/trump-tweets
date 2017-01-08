/* eslint-env browser */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import io from 'socket.io-client';

import rootReducer from './reducers/reducers';

import TweetsContainer from './components/containers/TweetsContainer';
import Header from './components/presentational/Header';

require('./scss/app.scss');

const socketAddr = `${window.location.hostname}:${process.env.PORT}`;
const socket = io(socketAddr);

const store = createStore(rootReducer);

export class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <div>
          <Header />
          <TweetsContainer socket={socket} />
        </div>
      </Provider>
    );
  }
}

export default App;
