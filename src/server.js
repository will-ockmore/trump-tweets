/* eslint-disable no-var, vars-on-top, prefer-template */
var tw = require('node-tweet-stream');
var chalk = require('chalk');
var bodyParser = require('body-parser');
var express = require('express');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var config = require('../config/twitter.json');
var paths = require('../config/paths.js');

var LOG_PREFIX = 'express backend';
var logger = require('../scripts/logger.js')(LOG_PREFIX);


var argv = process.argv.slice(2);
var port = argv[0];

// bodyParser middleware for request data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(paths.buildDir));

io.on('connection', () => logger('New user connected!'));

var tweetStream = tw(config);
tweetStream.track('theresa may');
tweetStream.on('tweet', t => io.emit('tweet', t));

app.get('*', (req, res) => {
  res.sendFile(paths.buildIndexHtml);
});

http.listen(port, () => logger(chalk.cyan('Listening on port ') + chalk.yellow.bold(port)));

