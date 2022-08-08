var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var prometheus = require('./middlewares/prometheus');
var time = require('./routes/time');

var app = express();
app.use(prometheus);

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/time', time);

module.exports = app;
