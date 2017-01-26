import React from 'react';
import { List, Map } from 'immutable';
import CSSTransitionGroup from 'react-addons-css-transition-group';

export const Tweet = ({ tweet }) =>
  <div className="card">
    <h4>{tweet.getIn(['user', 'name'])}:&nbsp;</h4>
    <span>{tweet.get('text')}</span>
  </div>;

Tweet.propTypes = {
  tweet: React.PropTypes.instanceOf(Map).isRequired,
};

export const TweetList = ({ tweets }) =>
  <CSSTransitionGroup
    className="card-container"
    transitionName="card-anim"
    transitionEnterTimeout={500}
    transitionLeaveTimeout={700}
  >
    {tweets.map(tweet =>
      <Tweet
        key={tweet.get('id_str')}
        tweet={tweet}
      />
    )}
  </CSSTransitionGroup>;

TweetList.propTypes = {
  tweets: React.PropTypes.instanceOf(List).isRequired,
};

export default TweetList;
