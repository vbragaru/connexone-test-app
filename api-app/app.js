var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

const dotenv  = require('dotenv');
(process.env.APP_ENV && dotenv.config({ path: process.env.APP_ENV })) || dotenv.config({ path: '.env.dev' });

var prometheus = require('./middlewares/prometheus');
var authorization = require('./middlewares/authorization');
var time = require('./routes/time');

var app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')));

app.use([authorization, prometheus]);
app.use('/api/v1/time', authorization, time);

module.exports = app;
