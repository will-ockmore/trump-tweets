/* eslint-disable no-var, vars-on-top, prefer-template, no-plusplus, no-underscore-dangle */
var tw = require('node-tweet-stream');
var chalk = require('chalk');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var express = require('express');

var config = require('../config/twitter.json');
var paths = require('../config/paths.js');

var Tweet = require('./models/tweet.js');

var LOG_PREFIX = 'express backend';
var logger = require('../scripts/logger.js').createLogger(LOG_PREFIX);
var errorLogger = require('../scripts/logger.js').catchErr;

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


// bodyParser middleware for request data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// direct requests for static files
app.use(express.static(paths.buildDir));

io.on('connection', () => logger('New user connected!'));

// mongodb mlab connection uri
mongoose.connect(process.env.MONGODB_URI);
var db = mongoose.connection;

// set up twitter stream
var tweetStream = tw(config);
tweetStream.track('trump');

var tweets = [];
var _tweets;

tweetStream.on('tweet', tweet => {
  tweets.push(tweet);
  io.emit('tweet', tweet);

  if (tweets.length > 200) {
    _tweets = tweets;
    tweets = [];

    Tweet.create(_tweets, (err, twts) => {
      if (err) {
        return errorLogger(err.stack);
      }
      logger('Successfully saved: ' + twts.length);
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(paths.buildIndexHtml);
});

http.listen(paths.nodeServerPort, () => logger(chalk.cyan('Listening on port ') + chalk.yellow.bold(paths.nodeServerPort)));

process.on('SIGINT', () => {
  db.close(() => {
    logger('mongoose connection closed.');
    process.exit(0);
  });
});

