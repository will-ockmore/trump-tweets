import React from 'react';
import { List, Map } from 'immutable';
import CSSTransitionGroup from 'react-addons-css-transition-group';

export const Tweet = ({ tweet }) =>
  <a
    target="_blank"
    rel="noopener noreferrer"
    style={{ 'target-new': 'tab' }}
    href={`https://twitter.com/${tweet.getIn(['user', 'screen_name'])}/status/${tweet.get('id_str')}`}
  >
    <div className="card">
      <h4>{tweet.getIn(['user', 'name'])}:&nbsp;</h4>
      <span>{tweet.get('text')}</span>
    </div>
  </a>;

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
