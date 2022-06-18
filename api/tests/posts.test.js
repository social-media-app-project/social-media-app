/* eslint-disable dot-notation */
/* eslint-disable no-undef */
const request = require('supertest');
const db = require('./db');
const app = require('../app');

let userOneToken;
let userTwoToken;
let noFriendsUserToken;

let userOnePostId;

beforeAll(async () => {
  await db.setUp();
  const { userOnePost } = await db.setUpPostsTests();
  userOnePostId = userOnePost['_id'];
});

afterAll(async () => {
  await db.dropDatabase();
});

test('successful logins', (done) => {
  request(app)
    .post('/auth/login')
    .send({
      username: 'user1',
      password: 'password',
    })
    .expect((res) => {
      expect(res.body).toHaveProperty('token');
    })
    .expect(200)
    .end((err, res) => {
      if (err) done(err);

      userOneToken = res.body.token;
      done();
    });

  request(app)
    .post('/auth/login')
    .send({
      username: 'user2',
      password: 'password',
    })
    .expect((res) => {
      expect(res.body).toHaveProperty('token');
    })
    .expect(200)
    .end((err, res) => {
      if (err) done(err);

      userTwoToken = res.body.token;
      done();
    });

  request(app)
    .post('/auth/login')
    .send({
      username: 'user3',
      password: 'password',
    })
    .expect((res) => {
      expect(res.body).toHaveProperty('token');
    })
    .expect(200)
    .end((err, res) => {
      if (err) done(err);

      noFriendsUserToken = res.body.token;
      done();
    });
});

describe('create new post', () => {
  test('create post sucess', (done) => {
    request(app)
      .post('/posts')
      .set('Authorization', userOneToken)
      .send({
        message: 'Hello',
      })
      .expect((res) => {
        expect(res.body).toHaveProperty('post');
      })
      .expect(200, done);
  });

  test('message too long', (done) => {
    request(app)
      .post('/posts')
      .set('Authorization', userOneToken)
      .send({
        message: 'x'.repeat(501),
      })
      .expect(400, done);
  });

  test('unauth', (done) => {
    request(app)
      .post('/posts')
      .send({
        message: 'x',
      })
      .expect(401, done);
  });
});

describe('get post by id', () => {
});

describe('get comments by post id', () => {

});

describe('get likes by post id', () => {

});

describe('like a post', () => {

});

describe('comment on a post', () => {

});

describe('delete a post', () => {

});

describe('update a post', () => {

});
