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
