require('dotenv').config()
const express = require('express')
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('/', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, '../client/dist/') });
});
app.use(bodyParser.json())
app.use(morgan('dev'));

app.listen(process.env.PORT, () => {
  console.log(`Server listening @ ${process.env.PORT}`);
});