/* eslint-env browser */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import io from 'socket.io-client';

import rootReducer from './reducers/reducers';

import TweetsContainer from './components/containers/TweetsContainer';

require('./scss/app.scss');


const socket = io('http://localhost:9090'); // server addr
const store = createStore(rootReducer);

export class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <TweetsContainer socket={socket} />
      </Provider>
    );
  }
}

export default App;
