import React from 'react';
import { Map } from 'immutable';

export const Header = () =>
  <div>
    <h1 className="header pd-2">Tweets about Trump</h1>
  </div>;

Header.propTypes = {
  tweet: React.PropTypes.instanceOf(Map).isRequired,
};

export default Header;
