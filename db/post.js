const mongoose = require('mongoose');
const User = require('./user.js');

//create post schema composed of a user, date, title and body
//user property is of type mongoose schema so that all the user information can be tied to each post
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

module.exports = Post;