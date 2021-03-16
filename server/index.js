require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const newsRouter = require('./newsRouter.js')
const apiRouter = require('./apiRouter.js')
const db = require('../db')
// const Post = require('../db/post.js')
// const User = require('../db/user.js')

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

app.use(bodyParser.json())
app.use(morgan('dev'));

app.use('/api', apiRouter)
app.use('/post/api', apiRouter)
app.use('/api/news', newsRouter)

// app.delete('/post/api/delete/:id', (req, res) => {
//   console.log(req.params.id, 'delete id')
//   Post.deleteOne({_id: req.params.id})
//     .then((results) => {
//       res.status(200).send(results)
//     })
//     .catch((err) => {
//       res.status(404).send(err)
//     })
// })

// app.get('/api/all_posts', (req, res) => {
//   Post.find({})
//     .then((results) => {
//       res.status(200).send(results)
//     })
//     .catch((err) => {
//       res.status(404).send(err)
//     })
//   })

// app.get('/api/posts/:id', (req, res) => {
//     User.findOne({firebaseId: req.params.id})
//     .populate('posts')
//     .then((results) => {
//       console.log(results.posts)
//       res.status(200).send(results.posts)
//     })
//     .catch((err) => {
//       res.status(404).send(err)
//     })
// })

// app.post('/api/add_user', (req, res) => {
//   User.create(req.body)
//     .then((response) => {
//       res.status(200).send(response)
//     })
//     .catch((err) => {
//       res.status(404).send(err)
//     })
// })

// app.post('/api/add_post', (req, res) => {
//   let post = {
//     date: Date(),
//     title: req.body.title,
//     body: req.body.body
//   }
//   let user = req.body.userId
//   User.findOne({firebaseId: user})
//     .then((userResults) => {
//       let id = userResults._id
//       post.user = id
//       Post.create(post)
//         .then((postResults) => {
//           let postId = postResults._id
//           userResults.posts.push(postId)
//           userResults.save()
//           res.status(200).send(postResults)
//         })
//         .catch((err) => {
//           res.status(404).send(err)
//         })
//     })
// })

// app.get('/api/update_post/:id', (req, res) => {
//   Post.findOne({_id: req.params.id})
//     .then((results) => {
//       res.status(200).send(results)
//     })
//     .catch((err) => {
//       res.status(404).send(err)
//     })
// })

// app.put('/api/update_post/:id', (req, res) => {
//   Post.updateOne({_id: req.params.id}, {
//     title: req.body.title,
//     body: req.body.body
//   })
//     .then((results) => {
//       res.status(200).send(results)
//     })
//     .catch((err) => {
//       res.status(404).send(err)
//     })
// })

// app.delete('/post/api/delete/:id', (req, res) => {
//   console.log(req.params.id, 'delete id')
//   Post.deleteOne({_id: req.params.id})
//     .then((results) => {
//       res.status(200).send(results)
//     })
//     .catch((err) => {
//       res.status(404).send(err)
//     })
// })

// app.use('/api/news', newsRouter)

// app.get('/api/:id', (req, res) => {
//   console.log('user request', req.body)
//   console.log('user params', req.params.id)
//   User.findOne({firebaseId: req.params.id})
//   .then((results) => {
//     res.status(200).send(results)
//   })
//   .catch((err) => {
//     res.status(404).send(err)
//   })
// })

app.listen(process.env.PORT, () => {
  console.log(`Server listening @ ${process.env.PORT}`);
});