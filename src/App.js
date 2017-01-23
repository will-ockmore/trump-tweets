/* eslint-env browser */
import React from 'react';
import { Provider } from 'react-redux';

import TweetsContainer from './components/containers/TweetsContainer';
import Header from './components/presentational/Header';

require('./scss/app.scss');


export class App extends React.Component {

  render() {
    const { store, socket } = this.props;

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

App.propTypes = {
  store: React.PropTypes.object.isRequired,
  socket: React.PropTypes.object.isRequired
};

export default App;
