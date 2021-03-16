const mongoose = require('mongoose');
const Post = require('./post.js')

const userSchema = mongoose.Schema({
  firebaseId: String,
  email: String,
  name: String,
  pic: String,
  posts: [{type: mongoose.Schema.ObjectId, ref: 'Post'}]
})

const User = mongoose.model('User', userSchema);

module.exports = User