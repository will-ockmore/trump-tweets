/* eslint-disable no-var, vars-on-top, prefer-template */
var bodyParser = require('body-parser');
var path       = require('path');

var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io');
var tw = require('node-tweet-stream');

var config = require('../config/twitter.json');
var paths  = require('../config/paths.js');


var ioServer = io(http);
ioServer.on('connection', () => console.log('new user connected!'))

var tweetStream = tw(config);
tweetStream.track('Javascript');
tweetStream.on('tweet', t => ioServer.emit('tweet', t));

// bodyParser middleware for request data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add headers for socket.io to connect to different host. Webpack...
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', paths.devServerAddr);

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions) - socket.io needs this
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.get('*', (req, res) => {
  res.sendFile(paths.publicIndexHtml);
});

http.listen(paths.nodeServerPort, () => console.log(`listening on ${paths.nodeServerPort}`));

