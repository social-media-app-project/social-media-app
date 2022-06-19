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

      [, userOneToken] = res.body.token.split(' ');
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

      [, userTwoToken] = res.body.token.split(' ');
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

      [, noFriendsUserToken] = res.body.token.split(' ');
      done();
    });
});

describe('create new post', () => {
  test('create post sucess', (done) => {
    request(app)
      .post('/posts')
      .auth(userOneToken, { type: 'bearer' })
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
      .auth(userOneToken, { type: 'bearer' })
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
  test('unauth', (done) => {
    request(app)
      .get(`/posts/${userOnePostId}`)
      .expect(401, done);
  });

  test('bad id', (done) => {
    request(app)
      .get('/posts/efjkpeojfpe')
      .auth(userOneToken, { type: 'bearer' })
      .expect(400, done);
  });

  test('success', (done) => {
    request(app)
      .get(`/posts/${userOnePostId}`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect((res) => {
        expect(res.body).toHaveProperty('post');
      })
      .expect(200, done);
  });
});

describe('get comments by post id', () => {
  test('unauth', (done) => {
    request(app)
      .get(`/posts/${userOnePostId}/comments`)
      .expect(401, done);
  });

  test('bad id', (done) => {
    request(app)
      .get('/posts/efjkpeojfpe/comments')
      .auth(userOneToken, { type: 'bearer' })
      .expect(400, done);
  });

  test('success', (done) => {
    request(app)
      .get(`/posts/${userOnePostId}/comments`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect((res) => {
        expect(res.body).toHaveProperty('comments');
      })
      .expect(200, done);
  });
});

describe('get likes by post id', () => {
  test('unauth', (done) => {
    request(app)
      .get(`/posts/${userOnePostId}/likes`)
      .expect(401, done);
  });

  test('bad id', (done) => {
    request(app)
      .get('/posts/efjkpeojfpe/likes')
      .auth(userOneToken, { type: 'bearer' })
      .expect(400, done);
  });

  test('success', (done) => {
    request(app)
      .get(`/posts/${userOnePostId}/likes`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect((res) => {
        expect(res.body).toHaveProperty('likes');
      })
      .expect(200, done);
  });
});

describe('like a post', () => {
  test('unauth', (done) => {
    request(app)
      .post(`/posts/${userOnePostId}/likes`)
      .expect(401, done);
  });

  test('bad id', (done) => {
    request(app)
      .post('/posts/efjkpeojfpe/likes')
      .auth(userOneToken, { type: 'bearer' })
      .expect(400, done);
  });

  test('not a friend', (done) => {
    request(app)
      .post(`/posts/${userOnePostId}/likes`)
      .auth(noFriendsUserToken, { type: 'bearer' })
      .expect(400, done);
  });

  test('success(self)', (done) => {
    request(app)
      .post(`/posts/${userOnePostId}/likes`)
      .auth(userOneToken, { type: 'bearer' })
      .expect(200, done);
  });

  test('success(friend)', (done) => {
    request(app)
      .post(`/posts/${userOnePostId}/likes`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect(200, done);
  });

  test('duplicate likes by userTwo', (done) => {
    request(app)
      .post(`/posts/${userOnePostId}/likes`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect(200)
      .end((err) => {
        if (err) done(err);

        request(app)
          .get(`/posts/${userOnePostId}/likes`)
          .auth(userTwoToken, { type: 'bearer' })
          .expect((res) => {
            expect(res.body).toHaveProperty('likes');
            // userOne's like and userTwo's like
            expect(res.body.likes).toHaveLength(2);
            expect(res.body.likes[0]).not.toEqual(res.body.likes[1]);
          })
          .expect(200, done);
      });
  });
});

describe('comment on a post', () => {
  test('unauth', (done) => {
    request(app)
      .post(`/posts/${userOnePostId}/comments`)
      .send({ message: 'this is a comment' })
      .expect(401, done);
  });

  test('bad id', (done) => {
    request(app)
      .post('/posts/efjkpeojfpe/comments')
      .auth(userOneToken, { type: 'bearer' })
      .send({ message: 'this is a comment' })
      .expect(400, done);
  });

  test('not a friend', (done) => {
    request(app)
      .post(`/posts/${userOnePostId}/comments`)
      .auth(noFriendsUserToken, { type: 'bearer' })
      .send({ message: 'this is a comment' })
      .expect(400, done);
  });

  test('success(self)', (done) => {
    request(app)
      .post(`/posts/${userOnePostId}/comments`)
      .auth(userOneToken, { type: 'bearer' })
      .send({ message: 'this is a comment1' })
      .expect(200, done);
  });

  test('success(friend)', (done) => {
    request(app)
      .post(`/posts/${userOnePostId}/comments`)
      .auth(userTwoToken, { type: 'bearer' })
      .send({ message: 'this is a comment2' })
      .expect(200, done);
  });

  test('get updated comments', (done) => {
    request(app)
      .get(`/posts/${userOnePostId}/comments`)
      .auth(userOneToken, { type: 'bearer' })
      .expect((res) => {
        expect(res.body).toHaveProperty('comments');
        expect(res.body.comments).toHaveLength(2);
      })
      .expect(200, done);
  });
});

describe('update a post', () => {
  test('unauth', (done) => {
    request(app)
      .put(`/posts/${userOnePostId}`)
      .send({ message: 'updating post' })
      .expect(401, done);
  });

  test('bad id', (done) => {
    request(app)
      .put('/posts/efjkpeojfpe')
      .auth(userOneToken, { type: 'bearer' })
      .send({ message: 'updating post' })
      .expect(400, done);
  });

  test('non-author', (done) => {
    request(app)
      .put(`/posts/${userOnePostId}`)
      .auth(userTwoToken, { type: 'bearer' })
      .send({ message: 'updating post' })
      .expect(400, done);
  });

  test('success', (done) => {
    request(app)
      .put(`/posts/${userOnePostId}`)
      .auth(userOneToken, { type: 'bearer' })
      .send({ message: 'updating post' })
      .expect(200, done);
  });
});

describe('delete a post', () => {
  test('unauth', (done) => {
    request(app)
      .delete(`/posts/${userOnePostId}`)
      .expect(401, done);
  });

  test('bad id', (done) => {
    request(app)
      .delete('/posts/efjkpeojfpe')
      .auth(userOneToken, { type: 'bearer' })
      .expect(400, done);
  });

  test('non-author', (done) => {
    request(app)
      .delete(`/posts/${userOnePostId}`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect(400, done);
  });

  test('success', (done) => {
    request(app)
      .delete(`/posts/${userOnePostId}`)
      .auth(userOneToken, { type: 'bearer' })
      .expect(200, done);
  });

  test('check post does not exist', (done) => {
    request(app)
      .get(`/posts/${userOnePostId}`)
      .auth(userOneToken, { type: 'bearer' })
      .expect(404, done);
  });
});
