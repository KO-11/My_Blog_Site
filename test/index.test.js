const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const expect = chai.expect();
const BlueBird = require('bluebird');

chai.use(chaiHttp);

const setupUsers = (...userObjects) => {
  return BlueBird.mapSeries(userObjects, user => {
      return chai.request('http://localhost:3000')
          .post('/api/add_user')
          .send(user)
          .then(response => {
              return response.body;
          })
  })
}

const setupPosts = (...postObjects) => {
  return BlueBird.mapSeries(postObjects, post => {
      return chai.request('http://localhost:3000')
          .post('/api/add_post')
          .send(post)
          .then(response => {
              return response.body;
          })
  })
}

describe('blog server', () => {
  const user1 = {
    firebaseId: '123',
    email: 'user1@mail.com',
    posts: []
  }

  const user2 = {
    firebaseId: '456',
    email: 'user2@mail.com',
    posts: []
  }

  const user3 = {
    firebaseId: '789',
    email: 'user3@mail.com',
    posts: []
  }

  const post1 = {
    user: {},
    date: Date(),
    title: 'title1',
    body: 'body1'
  }

  const post2 = {
    user: {},
    date: Date(),
    title: 'title2',
    body: 'body2'
  }

  const post3 = {
    user: {},
    date: Date(),
    title: 'title3',
    body: 'body3'
  }

  it('should return index.html file', async () => {
      const response = await chai.request('http://localhost:3000').get('/')
      response.should.have.status(200)
      response.type.should.eql('text/html')
  });

  it('should create a user', async () => {
      const response = await chai.request('http://localhost:3000').post('/api/add_user').send(user1)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.email.should.deep.equals('user1@mail.com')
  });

  it('should retrieve specific user', async () => {
      const results = await setupUsers(user1, user2, user3)
      const response = await chai.request('http://localhost:3000').get(`/api/${results[0].firebaseId}`)
      response.should.have.status(200)
      response.body.should.be.a('object')
      response.body.email.should.deep.equals('user1@mail.com')
  });



});