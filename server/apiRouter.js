const apiRouter = require('express').Router();
const Post = require('../db/post.js');
const User = require('../db/user.js');

//GET /all_posts - request retrieves all posts from the database, it utilizes the .populate method to fill the user property with the full user object from the database, as opposed to just the mongo ID, in doing so this request essentially pulls ALL the information on the users and the posts from the database, this works well on the frontend so one request delivers everything for frontend use.
//the way this project is set up this works fine, may consider refactoring if site became much larger and massive amounts of data was being queried by this function
apiRouter.get('/all_posts', (req, res) => {
  Post.find({})
    .populate('user')
    .then((results) => {
      res.status(200).send(results)
    })
    .catch((err) => {
      console.error(err, 'error from mongo')
      res.status(404).send(err)
    })
  })

  //POST add_user - request takes the body of the request which is an object with properties of firebaseId, email, name, pic and posts and creates a new user with these values. firebaseID and email are the only unique characteristics iniital creation on the front end sends an empty array for posts, 'anonymous' for the name, and a stock photo for the pic
  apiRouter.post('/add_user', (req, res) => {
    User.create(req.body)
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((err) => {
      res.status(404).send(err)
    })
  })

  //POST add_post - request pulls out the title and body from the body of the request and stores these values in a post object
  //a property of date is also created on this post object with a value of a date time stamp equal to the current time
  //a variable user is set to the userId that is pulled from the body of the request this userId is the associated user's firebase ID
  //these values are used to first query the mongo database for the user that matches the firebaseId equal to 'user'
  //then from these results the mongo ID associated with the user is pulled out and set equal to 'id'
  //then a create query is sent to create the new post with the date, title and body
  //the subsequent post mongo id is then pulled from these results and this id is pushed into the posts property array and then saved
  //while this process is a bit more complicated request/query the result is the post is tied to the associated user and the user is tied to the associated post
  apiRouter.post('/add_post', (req, res) => {
    let post = {
      date: Date(),
      title: req.body.title,
      body: req.body.body
    }
    let user = req.body.userId
    User.findOne({firebaseId: user})
    .then((userResults) => {
      let id = userResults._id
      post.user = id
      Post.create(post)
      .then((postResults) => {
        let postId = postResults._id
        userResults.posts.push(postId)
        userResults.save()
        res.status(200).send(postResults)
      })
      .catch((err) => {
        res.status(404).send(err)
      })
    })
  })

  //GET update_post/:id - request retrieves a specific post from the database, the params.id is the post's mongo ID
  //PUT update_post/:id - request updates the post information with an updated title and body, the params.id is the post's mongo ID
  apiRouter.route('/update_post/:id')
  .get((req, res) => {
    Post.findOne({_id: req.params.id})
    .then((results) => {
      res.status(200).send(results)
    })
    .catch((err) => {
      res.status(404).send(err)
    })
  })
  .put((req, res) => {
    Post.updateOne({_id: req.params.id}, {
      title: req.body.title,
      body: req.body.body
    })
    .then((results) => {
      res.status(200).send(results)
    })
    .catch((err) => {
      res.status(404).send(err)
    })
  })

  //GET user/:id - request retrieves a specific user from the database, the params.id is the firebase ID associated with the user
  //PUT user/:id - request updates the user information with an updated name and profile picture url which is linked to the photo uploaded into the firebase storage, the params.id is the firebase ID associated with the user
  apiRouter.route('/user/:id')
  .get((req, res) => {
    User.findOne({firebaseId: req.params.id})
    .then((results) => {
      res.status(200).send(results)
    })
    .catch((err) => {
      res.status(404).send(err)
    })
  })
  .put((req, res) => {
    User.findOneAndUpdate({firebaseId: req.params.id}, {name: req.body.name, pic: req.body.pic})
    .then((results) => {
      res.status(200).send(results)
    })
    .catch((err) => {
      res.status(404).send(err)
    })
  })

  //DELETE delete/:id - request deletes the post, its params.id is the post's mongo id in the database
  apiRouter.delete('/delete/:id', (req, res) => {
    console.log(req.params.id, 'delete id')
    Post.deleteOne({_id: req.params.id})
    .then((results) => {
      res.status(200).send(results)
    })
    .catch((err) => {
      res.status(404).send(err)
    })
  })

  module.exports = apiRouter

  //GET posts/:id - request retrieves all the posts of a specific user, the params.id is the firebase ID associated with the user
  //this query is never executed in this project but may be useful for future development
  // apiRouter.get('/posts/:id', (req, res) => {
  //     User.findOne({firebaseId: req.params.id})
  //     .populate('posts')
  //     .then((results) => {
  //       res.status(200).send(results.posts)
  //     })
  //     .catch((err) => {
  //       res.status(404).send(err)
  //     })
  // })