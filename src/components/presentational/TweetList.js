import React from 'react';
import { List, Map } from 'immutable';

export const Tweet = ({ tweet }) =>
  <div>
    <em>{tweet.getIn(['user', 'name'])}:&nbsp;</em>
    <span>{tweet.get('text')}</span>
  </div>;

Tweet.propTypes = {
  tweet: React.PropTypes.instanceOf(Map).isRequired,
};

export const TweetList = ({ tweets }) =>
  <div>
    {tweets.map(tweet =>
      <Tweet
        key={tweet.get('id')}
        tweet={tweet}
      />)
    }
  </div>;

TweetList.propTypes = {
  tweets: React.PropTypes.instanceOf(List).isRequired,
};

export default TweetList;
