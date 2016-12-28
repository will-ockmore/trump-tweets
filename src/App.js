import React from 'react';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';

import rootReducer from './reducers/reducers';

const mapStateToProps = state => ({ state });

const Paragraph = connect(mapStateToProps)(props => <p>Hi lol{console.log(props)}</p>);


const store = createStore(rootReducer);

export class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <div>
          <Paragraph />
        </div>
      </Provider>
    );
  }
}

export default App;
