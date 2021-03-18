const mongoose = require('mongoose');
require('dotenv').config();
//create promises out of mongoose methods
mongoose.Promise = global.Promise;

//define mongo uri the user password and database are stored as environment variables tied to the online mongoDB that was created for this project
const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.ociqz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

//connect to the mongo database
const db = mongoose.connect( uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to mongoose');
  })
  .catch((err) => {
    console.log(err);
  })

module.exports = db;