const mongoose = require('mongoose');
const Post = require('./post.js');

//create user schema composed of a firebaseid, email, name and pic
//posts property is an array of objects that are type mongoose schema so that all the post information can be tied to each user that created it
const userSchema = mongoose.Schema({
  firebaseId: String,
  email: String,
  name: String,
  pic: String,
  posts: [{type: mongoose.Schema.ObjectId, ref: 'Post'}]
})

const User = mongoose.model('User', userSchema);

module.exports = User;