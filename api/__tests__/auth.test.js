/* eslint-disable no-undef */
const request = require('supertest');
const db = require('../test_setup/db');
const { app } = require('../app');

beforeAll(async () => {
  await db.setUp();
});

afterEach(async () => {
  await db.dropCollections();
});

afterAll(async () => {
  await db.dropDatabase();
});

test('signup works', async () => {
  await request(app)
    .post('/auth/signup')
    .send({
      username: 'my_name',
      password: 'password',
      password_confirm: 'password',
      email: 'testemail@gmail.com',
    })
    .expect(200);
});

test('signup (name in use) does not work', async () => {
  await request(app)
    .post('/auth/signup')
    .send({
      username: 'my_name',
      password: 'password',
      password_confirm: 'password',
      email: 'testemail@gmail.com',
      bio: 'Hello this is a bio',
    });
  await request(app)
    .post('/auth/signup')
    .send({
      username: 'my_name',
      password: 'password',
      password_confirm: 'password',
      email: 'testemail@gmail.com',
      bio: 'Hello this is a bio',
    })
    .expect(400);
});

test('password confirm does not match', async () => {
  await request(app)
    .post('/auth/signup')
    .send({
      username: 'my_name',
      password: 'password',
      password_confirm: 'passworde',
      email: 'testemail@gmail.com',
      bio: 'Hello this is a bio',
    })
    .expect(400);
});

test('no username', async () => {
  await request(app)
    .post('/auth/signup')
    .send({
      username: '',
      password: 'password',
      password_confirm: 'password',
      email: 'testemail@gmail.com',
      bio: 'Hello this is a bio',
    })
    .expect(400);
});

test('no password', async () => {
  await request(app)
    .post('/auth/signup')
    .send({
      username: 'my_name',
      password: '',
      password_confirm: 'password',
      email: 'testemail@gmail.com',
      bio: 'Hello this is a bio',
    })
    .expect(400);
});

test('no email', async () => {
  await request(app)
    .post('/auth/signup')
    .send({
      username: 'my_name',
      password: 'password',
      password_confirm: 'password',
      email: '',
      bio: 'Hello this is a bio',
    })
    .expect(400);
});

test('malformed email', async () => {
  await request(app)
    .post('/auth/signup')
    .send({
      username: 'my_name',
      password: 'password',
      password_confirm: 'password',
      email: 'testemailgmail.com',
      bio: 'Hello this is a bio',
    })
    .expect(400);
});

test('bio too long', async () => {
  await request(app)
    .post('/auth/signup')
    .send({
      username: 'my_name',
      password: 'password',
      password_confirm: 'password',
      email: 'testemail@gmail.com',
      bio: 'bioooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
    })
    .expect(400);
});

test('successful login', async () => {
  await request(app)
    .post('/auth/signup')
    .send({
      username: 'my_name',
      password: 'password',
      password_confirm: 'password',
      email: 'testemail@gmail.com',
    })
    .expect(200);
  const res = await request(app)
    .post('/auth/login')
    .send({
      username: 'my_name',
      password: 'password',
    })
    .expect(200);
  expect(res.body).toHaveProperty('token');
});

test('unsuccessful login (username)', async () => {
  await request(app)
    .post('/auth/signup')
    .send({
      username: 'my_name',
      password: 'password',
      password_confirm: 'password',
      email: 'testemail@gmail.com',
      bio: 'Hello this is a bio',
    })
    .expect(200);
  await request(app)
    .post('/auth/login')
    .send({
      username: 'my_namee',
      password: 'password',
    })
    .expect(404);
});

test('unsuccessful login (password)', async () => {
  await request(app)
    .post('/auth/signup')
    .send({
      username: 'my_name',
      password: 'password',
      password_confirm: 'password',
      email: 'testemail@gmail.com',
      bio: 'Hello this is a bio',
    })
    .expect(200);
  await request(app)
    .post('/auth/login')
    .send({
      username: 'my_name',
      password: 'passworde',
    })
    .expect(404);
});
