/* eslint-disable no-var, vars-on-top, prefer-template, no-plusplus */
var tw = require('node-tweet-stream');
var chalk = require('chalk');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var express = require('express');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var config = require('../config/twitter.json');
var paths = require('../config/paths.js');

var LOG_PREFIX = 'express backend';
var logger = require('../scripts/logger.js').createLogger(LOG_PREFIX);


var tweetCount = 0;

// bodyParser middleware for request data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// mongodb mlab connection uri
mongoose.connect('mongodb://will-ockmore:jU5SpWpbiz7Kzi6LP2Iz@ds135818.mlab.com:35818/trump-tweets');

// direct requests for static files
app.use(express.static(paths.buildDir));

io.on('connection', () => logger('New user connected!'));

var tweetStream = tw(config);
tweetStream.track('trump');

tweetStream.on('tweet', t => {
  tweetCount++;
  io.emit('tweet', t);
});

app.get('*', (req, res) => {
  res.sendFile(paths.buildIndexHtml);
});

http.listen(paths.nodeServerPort, () => logger(chalk.cyan('Listening on port ') + chalk.yellow.bold(paths.nodeServerPort)));

process.on('SIGINT', () => {
  console.log('=================');
  console.log('');
  console.log('Number of tweets recorded:', tweetCount);
  console.log('');
  console.log('=================');
});

