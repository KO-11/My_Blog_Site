const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');
const db = require('../db')
const BlueBird = require('bluebird');
const User = require('../db/user.js');
const Post = require('../db/post.js');
const port = 3000;

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
};

const setupPosts = (...postObjects) => {
  return BlueBird.mapSeries(postObjects, post => {
    return chai.request('http://localhost:3000')
      .post(`/api/add_post`)
      .send(post)
      .then(response => {
          return response.body;
      })
  })
}

describe('blog server apis', () => {
  const user1 = {
    firebaseId: '123',
    email: 'user1@mail.com',
    name: 'test',
    pic: 'pic',
    posts: []
  };

  const user2 = {
    firebaseId: '456',
    email: 'user1@mail.com',
    name: 'test',
    pic: 'pic',
    posts: []
  };

  const user3 = {
    firebaseId: '789',
    email: 'user1@mail.com',
    name: 'test',
    pic: 'pic',
    posts: []
  };

  const post1 = {
    user: user1,
    date: Date(),
    title: 'test',
    body: 'body1'
  }

  const post2 = {
    user: user2,
    date: Date(),
    title: 'test',
    body: 'body2'
  }

  const post3 = {
    user: user3,
    date: Date(),
    title: 'test',
    body: 'body3'
  }

  afterEach(async () => {
      await User.deleteMany({ name: 'test' });
      await Post.deleteMany();
  });

  it('should create a user', async() => {
      const response = await chai.request(server).post('/api/add_user').send(user1);
      response.should.have.status(200);
      response.body.should.be.a('object');
      response.body.email.should.deep.equals('user1@mail.com');
  });

  it('should retrieve specific user', async () => {
    const results = await setupUsers(user1, user2, user3);
    const response = await chai.request(server).get(`/api/user/${user1.firebaseId}`);
    response.should.have.status(200);
    response.body.should.be.a('object');
    response.body.email.should.deep.equals('user1@mail.com');
  });


  it('should update specific user', async () => {
    const results = await setupUsers(user1, user2, user3);

    const updateResponse = await chai.request(server).put(`/api/user/${user1.firebaseId}`).send({name: 'test', pic: 'updatedPic'});
    updateResponse.should.have.status(200);
    updateResponse.body.should.be.a('object');
    updateResponse.body.pic.should.deep.equals('pic');

    const getResponse = await chai.request(server).get(`/api/user/${user1.firebaseId}`);
    getResponse.should.have.status(200);
    getResponse.body.should.be.a('object');
    getResponse.body.pic.should.deep.equals('updatedPic');
  });

  it('should create a post', async() => {
    await setupUsers(user1, user2, user3);

    const post = post1;
    post.userId = user1.firebaseId;
    const response = await chai.request(server).post('/api/add_post').send(post);
    response.should.have.status(200);
    response.body.should.be.a('object');
    response.body.body.should.deep.equals('body1');
  });

  it('should retrieve a specific post', async() => {
    const userResults = await setupUsers(user1, user2, user3)

    const post_1 = post1;
    post_1.userId = user1.firebaseId;
    const post_2 = post2;
    post_2.userId = user2.firebaseId;
    const post_3 = post3;
    post_3.userId = user3.firebaseId;
    const postResults = await setupPosts(post_1, post_2, post_3);

    const response = await chai.request(server).get(`/api/update_post/${postResults[2]._id}`);
    response.should.have.status(200);
    response.body.should.be.a('object');
    response.body.body.should.deep.equals('body3');
  });

  it('should update a specific post', async() => {
    const userResults = await setupUsers(user1, user2, user3)

    const post_1 = post1;
    post_1.userId = user1.firebaseId;
    const post_2 = post2;
    post_2.userId = user2.firebaseId;
    const post_3 = post3;
    post_3.userId = user3.firebaseId;
    const postResults = await setupPosts(post_1, post_2, post_3);

    const updateResponse = await chai.request(server).put(`/api/update_post/${postResults[2]._id}`).send({title: 'test', body: 'updateBody'});
    updateResponse.should.have.status(200);
    updateResponse.body.should.be.a('object');

    const getResponse = await chai.request(server).get(`/api/update_post/${postResults[2]._id}`);
    getResponse.should.have.status(200);
    getResponse.body.should.be.a('object');
    getResponse.body.body.should.deep.equals('updateBody');
  });

  it('should get all posts', async() => {
    const userResults = await setupUsers(user1, user2, user3)

    const post_1 = post1;
    post_1.userId = user1.firebaseId;
    const post_2 = post2;
    post_2.userId = user2.firebaseId;
    const post_3 = post3;
    post_3.userId = user3.firebaseId;
    const postResults = await setupPosts(post_1, post_2, post_3);

    const response = await chai.request(server).get(`/api/all_posts`);
    response.should.have.status(200);
    response.body.should.be.a('array');
    response.body.length.should.deep.equals(3);
  });

  it('should delete a post', async() => {
    const userResults = await setupUsers(user1, user2, user3)

    const post_1 = post1;
    post_1.userId = user1.firebaseId;
    const post_2 = post2;
    post_2.userId = user2.firebaseId;
    const post_3 = post3;
    post_3.userId = user3.firebaseId;
    const postResults = await setupPosts(post_1, post_2, post_3);

    const deleteResponse = await chai.request(server).delete(`/api/delete/${postResults[0]._id}`);
    deleteResponse.should.have.status(200);
    deleteResponse.body.should.be.a('object');

    const getResponse = await chai.request(server).get(`/api/all_posts`);
    getResponse.should.have.status(200);
    getResponse.body.should.be.a('array');
    getResponse.body.length.should.deep.equals(2);
  });

});

describe('news server apis', () => {

  it('should pull an array of news articles', async () => {
    const response = await chai.request(server).get('/api/news');
    response.should.have.status(200);
    response.body.should.be.a('array');
    response.body[0].url.should.be.a('string');

  })

});


