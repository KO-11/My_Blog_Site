const mongoose = require('mongoose');
require('dotenv').config()

mongoose.Promise = global.Promise;

const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.ociqz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

const db = mongoose.connect( uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to mongoose');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = db