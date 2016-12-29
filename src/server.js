/* eslint-disable no-var, vars-on-top, prefer-template */
var bodyParser = require('body-parser');
var path       = require('path');
var tw         = require('node-tweet-stream');
var chalk      = require('chalk');

var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);

var config = require('../config/twitter.json');
var paths  = require('../config/paths.js');

var LOG_PREFIX = 'express backend';
var logger = require('../scripts/logger.js')(LOG_PREFIX);


var argv = process.argv.slice(2);
var port = argv[0];

io.on('connection', () => logger('new user connected!'))

var tweetStream = tw(config);
tweetStream.track('javascript');
tweetStream.track('bacon');
tweetStream.track('surfing');
tweetStream.on('tweet', t => io.emit('tweet', t));

// bodyParser middleware for request data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('*', (req, res) => {
  res.sendFile(paths.publicIndexHtml);
});

http.listen(port, () => logger(chalk.green(`listening on ${port}`)));

