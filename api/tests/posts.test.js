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

test('successful logins', async () => {
  let res;
  res = await request(app)
    .post('/auth/login')
    .send({
      username: 'user1',
      password: 'password',
    })
    .expect(200);
  expect(res.body).toHaveProperty('token');
  [, userOneToken] = res.body.token.split(' ');

  res = await request(app)
    .post('/auth/login')
    .send({
      username: 'user2',
      password: 'password',
    })
    .expect(200);
  expect(res.body).toHaveProperty('token');
  [, userTwoToken] = res.body.token.split(' ');

  res = await request(app)
    .post('/auth/login')
    .send({
      username: 'user3',
      password: 'password',
    })
    .expect(200);
  expect(res.body).toHaveProperty('token');
  [, noFriendsUserToken] = res.body.token.split(' ');
});

describe('create new post', () => {
  test('create post sucess', async () => {
    const res = await request(app)
      .post('/posts')
      .auth(userOneToken, { type: 'bearer' })
      .send({
        message: 'Hello',
      })
      .expect(200);
    expect(res.body).toHaveProperty('post');
  });

  test('message too long', async () => {
    await request(app)
      .post('/posts')
      .auth(userOneToken, { type: 'bearer' })
      .send({
        message: 'x'.repeat(501),
      })
      .expect(400);
  });

  test('unauth', async () => {
    await request(app)
      .post('/posts')
      .send({
        message: 'x',
      })
      .expect(401);
  });
});

describe('get post by id', () => {
  test('unauth', async () => {
    await request(app)
      .get(`/posts/${userOnePostId}`)
      .expect(401);
  });

  test('bad id', async () => {
    await request(app)
      .get('/posts/efjkpeojfpe')
      .auth(userOneToken, { type: 'bearer' })
      .expect(400);
  });

  test('success', async () => {
    const res = await request(app)
      .get(`/posts/${userOnePostId}`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect(200);
    expect(res.body).toHaveProperty('post');
  });
});

describe('get comments by post id', () => {
  test('unauth', async () => {
    await request(app)
      .get(`/posts/${userOnePostId}/comments`)
      .expect(401);
  });

  test('bad id', async () => {
    await request(app)
      .get('/posts/efjkpeojfpe/comments')
      .auth(userOneToken, { type: 'bearer' })
      .expect(400);
  });

  test('success', async () => {
    const res = await request(app)
      .get(`/posts/${userOnePostId}/comments`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect(200);
    expect(res.body).toHaveProperty('comments');
  });
});

describe('get likes by post id', () => {
  test('unauth', async () => {
    await request(app)
      .get(`/posts/${userOnePostId}/likes`)
      .expect(401);
  });

  test('bad id', async () => {
    await request(app)
      .get('/posts/efjkpeojfpe/likes')
      .auth(userOneToken, { type: 'bearer' })
      .expect(400);
  });

  test('success', async () => {
    const res = await request(app)
      .get(`/posts/${userOnePostId}/likes`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect(200);
    expect(res.body).toHaveProperty('likes');
  });
});

describe('like a post', () => {
  test('unauth', async () => {
    await request(app)
      .post(`/posts/${userOnePostId}/likes`)
      .expect(401);
  });

  test('bad id', async () => {
    await request(app)
      .post('/posts/efjkpeojfpe/likes')
      .auth(userOneToken, { type: 'bearer' })
      .expect(400);
  });

  test('not a friend', async () => {
    await request(app)
      .post(`/posts/${userOnePostId}/likes`)
      .auth(noFriendsUserToken, { type: 'bearer' })
      .expect(400);
  });

  test('success(self)', async () => {
    await request(app)
      .post(`/posts/${userOnePostId}/likes`)
      .auth(userOneToken, { type: 'bearer' })
      .expect(200);
  });

  test('success(friend)', async () => {
    await request(app)
      .post(`/posts/${userOnePostId}/likes`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect(200);
  });

  test('duplicate likes by userTwo', async () => {
    await request(app)
      .post(`/posts/${userOnePostId}/likes`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect(200);
    const res = await request(app)
      .get(`/posts/${userOnePostId}/likes`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect(200);
    expect(res.body).toHaveProperty('likes');
    // userOne's like and userTwo's like
    expect(res.body.likes).toHaveLength(2);
    expect(res.body.likes[0]).not.toEqual(res.body.likes[1]);
  });

  test('delete like (author of post)', async () => {
    await request(app)
      .post(`/posts/${userOnePostId}/likes`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect(200);

    let res = await request(app)
      .get(`/posts/${userOnePostId}/likes`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect(200);

    expect(res.body).toHaveProperty('likes');
    expect(res.body.likes).toHaveLength(2);

    const likeId = res.body.likes[1]['_id'];

    await request(app)
      .delete(`/posts/${userOnePostId}/likes/${likeId}`)
      .auth(userOneToken, { type: 'bearer' })
      .expect(200);

    res = await request(app)
      .get(`/posts/${userOnePostId}/likes`)
      .auth(userOneToken, { type: 'bearer' })
      .expect(200);

    expect(res.body).toHaveProperty('likes');
    expect(res.body.likes).toHaveLength(1);
  });

  test('delete like (author of like)', async () => {
    await request(app)
      .post(`/posts/${userOnePostId}/likes`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect(200);

    let res = await request(app)
      .get(`/posts/${userOnePostId}/likes`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect(200);

    expect(res.body).toHaveProperty('likes');
    expect(res.body.likes).toHaveLength(2);

    const likeId = res.body.likes[1]['_id'];

    await request(app)
      .delete(`/posts/${userOnePostId}/likes/${likeId}`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect(200);

    res = await request(app)
      .get(`/posts/${userOnePostId}/likes`)
      .auth(userOneToken, { type: 'bearer' })
      .expect(200);

    expect(res.body).toHaveProperty('likes');
    expect(res.body.likes).toHaveLength(1);
  });

  test('delete like (unauth)', async () => {
    await request(app)
      .post(`/posts/${userOnePostId}/likes`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect(200);

    let res = await request(app)
      .get(`/posts/${userOnePostId}/likes`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect(200);

    expect(res.body).toHaveProperty('likes');
    expect(res.body.likes).toHaveLength(2);

    const likeId = res.body.likes[1]['_id'];

    await request(app)
      .delete(`/posts/${userOnePostId}/likes/${likeId}`)
      .auth(noFriendsUserToken, { type: 'bearer' })
      .expect(400);

    res = await request(app)
      .get(`/posts/${userOnePostId}/likes`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect(200);

    expect(res.body).toHaveProperty('likes');
    expect(res.body.likes).toHaveLength(2);
  });
});

describe('comment on a post', () => {
  test('unauth', async () => {
    await request(app)
      .post(`/posts/${userOnePostId}/comments`)
      .send({ message: 'this is a comment' })
      .expect(401);
  });

  test('bad id', async () => {
    await request(app)
      .post('/posts/efjkpeojfpe/comments')
      .auth(userOneToken, { type: 'bearer' })
      .send({ message: 'this is a comment' })
      .expect(400);
  });

  test('not a friend', async () => {
    await request(app)
      .post(`/posts/${userOnePostId}/comments`)
      .auth(noFriendsUserToken, { type: 'bearer' })
      .send({ message: 'this is a comment' })
      .expect(400);
  });

  test('success(self)', async () => {
    await request(app)
      .post(`/posts/${userOnePostId}/comments`)
      .auth(userOneToken, { type: 'bearer' })
      .send({ message: 'this is a comment1' })
      .expect(200);
  });

  test('success(friend)', async () => {
    await request(app)
      .post(`/posts/${userOnePostId}/comments`)
      .auth(userTwoToken, { type: 'bearer' })
      .send({ message: 'this is a comment2' })
      .expect(200);
  });

  test('get updated comments', async () => {
    const res = await request(app)
      .get(`/posts/${userOnePostId}/comments`)
      .auth(userOneToken, { type: 'bearer' })
      .expect(200);
    expect(res.body).toHaveProperty('comments');
    expect(res.body.comments).toHaveLength(2);
  });

  test('delete comment (author of post)', async () => {
    await request(app)
      .post(`/posts/${userOnePostId}/comments`)
      .auth(userTwoToken, { type: 'bearer' })
      .send({ message: 'this is a comment' })
      .expect(200);

    let res = await request(app)
      .get(`/posts/${userOnePostId}/comments`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect(200);

    expect(res.body).toHaveProperty('comments');
    expect(res.body.comments).toHaveLength(3);

    const commentId = res.body.comments[2]['_id'];

    await request(app)
      .delete(`/posts/${userOnePostId}/comments/${commentId}`)
      .auth(userOneToken, { type: 'bearer' })
      .expect(200);

    res = await request(app)
      .get(`/posts/${userOnePostId}/comments`)
      .auth(userOneToken, { type: 'bearer' })
      .expect(200);

    expect(res.body).toHaveProperty('comments');
    expect(res.body.comments).toHaveLength(2);
  });

  test('delete comment (author of comment)', async () => {
    await request(app)
      .post(`/posts/${userOnePostId}/comments`)
      .auth(userTwoToken, { type: 'bearer' })
      .send({ message: 'this is a comment' })
      .expect(200);

    let res = await request(app)
      .get(`/posts/${userOnePostId}/comments`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect(200);

    expect(res.body).toHaveProperty('comments');
    expect(res.body.comments).toHaveLength(3);

    const commentId = res.body.comments[2]['_id'];

    await request(app)
      .delete(`/posts/${userOnePostId}/comments/${commentId}`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect(200);

    res = await request(app)
      .get(`/posts/${userOnePostId}/comments`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect(200);

    expect(res.body).toHaveProperty('comments');
    expect(res.body.comments).toHaveLength(2);
  });

  test('delete comment (unauth)', async () => {
    await request(app)
      .post(`/posts/${userOnePostId}/comments`)
      .auth(userTwoToken, { type: 'bearer' })
      .send({ message: 'this is a comment' })
      .expect(200);

    let res = await request(app)
      .get(`/posts/${userOnePostId}/comments`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect(200);

    expect(res.body).toHaveProperty('comments');
    expect(res.body.comments).toHaveLength(3);

    const commentId = res.body.comments[2]['_id'];

    await request(app)
      .delete(`/posts/${userOnePostId}/comments/${commentId}`)
      .auth(noFriendsUserToken, { type: 'bearer' })
      .expect(400);

    res = await request(app)
      .get(`/posts/${userOnePostId}/comments`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect(200);

    expect(res.body).toHaveProperty('comments');
    expect(res.body.comments).toHaveLength(3);
  });
});

describe('update a post', () => {
  test('unauth', async () => {
    await request(app)
      .put(`/posts/${userOnePostId}`)
      .send({ message: 'updating post' })
      .expect(401);
  });

  test('bad id', async () => {
    await request(app)
      .put('/posts/efjkpeojfpe')
      .auth(userOneToken, { type: 'bearer' })
      .send({ message: 'updating post' })
      .expect(400);
  });

  test('non-author', async () => {
    await request(app)
      .put(`/posts/${userOnePostId}`)
      .auth(userTwoToken, { type: 'bearer' })
      .send({ message: 'updating post' })
      .expect(400);
  });

  test('success', async () => {
    await request(app)
      .put(`/posts/${userOnePostId}`)
      .auth(userOneToken, { type: 'bearer' })
      .send({ message: 'updating post' })
      .expect(200);
  });
});

describe('delete a post', () => {
  test('unauth', async () => {
    await request(app)
      .delete(`/posts/${userOnePostId}`)
      .expect(401);
  });

  test('bad id', async () => {
    await request(app)
      .delete('/posts/efjkpeojfpe')
      .auth(userOneToken, { type: 'bearer' })
      .expect(400);
  });

  test('non-author', async () => {
    await request(app)
      .delete(`/posts/${userOnePostId}`)
      .auth(userTwoToken, { type: 'bearer' })
      .expect(400);
  });

  test('success', async () => {
    await request(app)
      .delete(`/posts/${userOnePostId}`)
      .auth(userOneToken, { type: 'bearer' })
      .expect(200);
  });

  test('check post does not exist', async () => {
    await request(app)
      .get(`/posts/${userOnePostId}`)
      .auth(userOneToken, { type: 'bearer' })
      .expect(404);
  });
});
