require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const newsRouter = require('./newsRouter.js');
const apiRouter = require('./apiRouter.js');
const db = require('../db')

//retrun the index.html for all static requests
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('/', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '../client/dist/') });
});
app.get('/login', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '../client/dist/') });
});
app.get('/signup', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '../client/dist/') });
});
app.get('/reset-password', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '../client/dist/') });
});

//utilize some preferred middlewares to parse the body and help with development when making requests to the server
app.use(bodyParser.json());
app.use(morgan('dev'));

//create routers for the news api and then the api for requests to the mongoDB
app.use('/api', apiRouter);
app.use('/api/news', newsRouter);

//listen on port
app.listen(process.env.PORT, () => {
  console.log(`Server listening @ ${process.env.PORT}`);
});

module.exports = app