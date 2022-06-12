/* eslint-disable no-undef */
const request = require('supertest');
const db = require('./db');
const app = require('../app');

beforeAll(async () => {
  await db.setUp();
});

afterEach(async () => {
  await db.dropCollections();
});

afterAll(async () => {
  await db.dropDatabase();
});

test('signup works', (done) => {
  request(app)
    .post('/auth/signup')
    .send({
      username: 'my_name',
      password: 'password',
      password_confirm: 'password',
      email: 'testemail@gmail.com',
    })
    .expect(200, done);
});

test('signup (name in use) does not work', (done) => {
  request(app)
    .post('/auth/signup')
    .send({
      username: 'my_name',
      password: 'password',
      password_confirm: 'password',
      email: 'testemail@gmail.com',
      bio: 'Hello this is a bio',
    })
    .end((err) => {
      if (err) {
        done(err);
      }
      request(app)
        .post('/auth/signup')
        .send({
          username: 'my_name',
          password: 'password',
          password_confirm: 'password',
          email: 'testemail@gmail.com',
          bio: 'Hello this is a bio',
        })
        .expect(404, done);
    });
});

test('password confirm does not match', (done) => {
  request(app)
    .post('/auth/signup')
    .send({
      username: 'my_name',
      password: 'password',
      password_confirm: 'passworde',
      email: 'testemail@gmail.com',
      bio: 'Hello this is a bio',
    })
    .expect(404, done);
});

test('no username', (done) => {
  request(app)
    .post('/auth/signup')
    .send({
      username: '',
      password: 'password',
      password_confirm: 'password',
      email: 'testemail@gmail.com',
      bio: 'Hello this is a bio',
    })
    .expect(404, done);
});

test('no password', (done) => {
  request(app)
    .post('/auth/signup')
    .send({
      username: 'my_name',
      password: '',
      password_confirm: 'password',
      email: 'testemail@gmail.com',
      bio: 'Hello this is a bio',
    })
    .expect(404, done);
});

test('no email', (done) => {
  request(app)
    .post('/auth/signup')
    .send({
      username: 'my_name',
      password: 'password',
      password_confirm: 'password',
      email: '',
      bio: 'Hello this is a bio',
    })
    .expect(404, done);
});

test('malformed email', (done) => {
  request(app)
    .post('/auth/signup')
    .send({
      username: 'my_name',
      password: 'password',
      password_confirm: 'password',
      email: 'testemailgmail.com',
      bio: 'Hello this is a bio',
    })
    .expect(404, done);
});

test('bio too long', (done) => {
  request(app)
    .post('/auth/signup')
    .send({
      username: 'my_name',
      password: 'password',
      password_confirm: 'password',
      email: 'testemail@gmail.com',
      bio: 'bioooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
    })
    .expect(404, done);
});

test('successful login', (done) => {
  request(app)
    .post('/auth/signup')
    .send({
      username: 'my_name',
      password: 'password',
      password_confirm: 'password',
      email: 'testemail@gmail.com',
    })
    .expect(200)
    .end((err) => {
      if (err) {
        done(err);
      }
      request(app)
        .post('/auth/login')
        .send({
          username: 'my_name',
          password: 'password',
        })
        .expect((res) => {
          expect(res.body).toHaveProperty('token');
        })
        .expect(200, done);
    });
});

test('unsuccessful login (username)', (done) => {
  request(app)
    .post('/auth/signup')
    .send({
      username: 'my_name',
      password: 'password',
      password_confirm: 'password',
      email: 'testemail@gmail.com',
      bio: 'Hello this is a bio',
    })
    .expect(200)
    .end((err) => {
      if (err) {
        done(err);
      }
      request(app)
        .post('/auth/login')
        .send({
          username: 'my_namee',
          password: 'password',
        })
        .expect(404, done);
    });
});

test('unsuccessful login (password)', (done) => {
  request(app)
    .post('/auth/signup')
    .send({
      username: 'my_name',
      password: 'password',
      password_confirm: 'password',
      email: 'testemail@gmail.com',
      bio: 'Hello this is a bio',
    })
    .expect(200)
    .end((err) => {
      if (err) {
        done(err);
      }
      request(app)
        .post('/auth/login')
        .send({
          username: 'my_name',
          password: 'passworde',
        })
        .expect(404, done);
    });
});
