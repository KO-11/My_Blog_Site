const mongoose = require('mongoose');
const User = require('./user.js');

const postSchema = mongoose.Schema({
  user: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User"
  },
  date: Date,
  title: String,
  body: String,
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post