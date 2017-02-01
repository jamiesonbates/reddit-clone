'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();

const api = require('./routes/api');

app.use(bodyParser.json());

app.use('/api', api);

app.use(express.static(path.join(__dirname, 'public')));

app.use('*', (req, res, next) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public')});
});

module.exports = app;
