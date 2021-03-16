const apiRouter = require('express').Router()
const Post = require('../db/post.js')
const User = require('../db/user.js')

apiRouter.route('/')

apiRouter.get('/all_posts', (req, res) => {
  Post.find({})
    .populate('user')
    .then((results) => {
      res.status(200).send(results)
    })
    .catch((err) => {
      res.status(404).send(err)
    })
  })

apiRouter.get('/posts/:id', (req, res) => {
    User.findOne({firebaseId: req.params.id})
    .populate('posts')
    .then((results) => {
      res.status(200).send(results.posts)
    })
    .catch((err) => {
      res.status(404).send(err)
    })
})

apiRouter.post('/add_user', (req, res) => {
  User.create(req.body)
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((err) => {
      res.status(404).send(err)
    })
})

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

apiRouter.get('/user/:id', (req, res) => {
  User.findOne({firebaseId: req.params.id})
  .then((results) => {
    res.status(200).send(results)
  })
  .catch((err) => {
    res.status(404).send(err)
  })
})

apiRouter.put('/user/:id', (req, res) => {
  User.findOneAndUpdate({firebaseId: req.params.id}, {name: req.body.name, pic: req.body.pic})
  .then((results) => {
    res.status(200).send(results)
  })
  .catch((err) => {
    res.status(404).send(err)
  })
})

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