import request from 'supertest';
import { app } from '../../app';
import { book, user } from '../../tests';
import { faker } from '@faker-js/faker';

describe('Books Routes E2E tests', () => {
  const userData = {
    ...user,
    id: undefined,
    created_at: undefined,
    updated_at: undefined,
  };

  const bookData = {
    ...book,
    id: undefined,
    total_pages: 400,
    start_date: '2026-06-07T01:28:00.523Z',
    end_date: '2026-06-07T01:28:00.523Z',
    created_at: undefined,
    updated_at: undefined,
  };

  test('POST /api/books should return 201 when book is created', async () => {
    const { body: createdUser } = await request(app)
      .post('/api/users')
      .send(userData);

    const authResponse = await request(app).post('/api/auth/login').send({
      email: createdUser.email,
      password: user.password,
    });

    if (!authResponse.body.tokens?.accessToken) {
      throw new Error(
        `Login failed: ${JSON.stringify(authResponse.body)} | user: ${JSON.stringify(createdUser)}`,
      );
    }

    const response = await request(app)
      .post('/api/books')
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send({
        ...bookData,
        user_id: createdUser.id,
      });

    expect(response.status).toBe(201);
  });

  test('GET /api/books/:bookId should return 200 when book is found', async () => {
    const { body: createdUser } = await request(app)
      .post('/api/users')
      .send(userData);

    const authResponse = await request(app).post('/api/auth/login').send({
      email: createdUser.email,
      password: user.password,
    });

    const { body: createdBook } = await request(app)
      .post('/api/books')
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send({
        ...bookData,
        user_id: createdUser.id,
      });

    const response = await request(app)
      .get(`/api/books/${createdBook.id}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdBook.id);
  });

  test('GET /api/books should return 200 when books are found', async () => {
    const { body: createdUser } = await request(app)
      .post('/api/users')
      .send(userData);

    const authResponse = await request(app).post('/api/auth/login').send({
      email: createdUser.email,
      password: user.password,
    });

    const { body: createdBook } = await request(app)
      .post('/api/books')
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send({
        ...bookData,
        user_id: createdUser.id,
      });

    const response = await request(app)
      .get('/api/books')
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].id).toBe(createdBook.id);
  });

  test('DELETE /api/books/:id should return 200 when book is deleted', async () => {
    const { body: createdUser } = await request(app)
      .post('/api/users')
      .send(userData);

    const authResponse = await request(app).post('/api/auth/login').send({
      email: createdUser.email,
      password: user.password,
    });

    const { body: createdBook } = await request(app)
      .post('/api/books')
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send({
        ...bookData,
        user_id: createdUser.id,
      });

    const response = await request(app)
      .delete(`/api/books/${createdBook.id}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`);

    expect(response.status).toBe(200);
  });

  test('PATCH /api/books/:bookId should return 200 when book is updated', async () => {
    const { body: createdUser } = await request(app)
      .post('/api/users')
      .send(userData);

    const authResponse = await request(app).post('/api/auth/login').send({
      email: createdUser.email,
      password: user.password,
    });

    const { body: createdBook } = await request(app)
      .post('/api/books')
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send({
        ...bookData,
        user_id: createdUser.id,
      });

    const response = await request(app)
      .patch(`/api/books/${createdBook.id}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send({
        ...bookData,
        user_id: createdUser.id,
        title: 'Updated Book',
      });

    expect(response.status).toBe(200);
  });

  test('DELETE /api/books/:bookId should return 404 when book is not found', async () => {
    const { body: createdUser } = await request(app)
      .post('/api/users')
      .send(userData);

    const authResponse = await request(app).post('/api/auth/login').send({
      email: createdUser.email,
      password: user.password,
    });

    const response = await request(app)
      .delete(`/api/books/${faker.string.uuid()}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`);

    expect(response.status).toBe(404);
  });

  test('PATCH /api/books/:bookId should return 404 when book is not found', async () => {
    const { body: createdUser } = await request(app)
      .post('/api/users')
      .send(userData);

    const authResponse = await request(app).post('/api/auth/login').send({
      email: createdUser.email,
      password: user.password,
    });

    const response = await request(app)
      .patch(`/api/books/${faker.string.uuid()}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send({
        ...bookData,
        user_id: createdUser.id,
        title: 'Updated Book',
      });

    expect(response.status).toBe(404);
  });

  test('GET /api/books/:bookId should return 404 when book is not found', async () => {
    const { body: createdUser } = await request(app)
      .post('/api/users')
      .send(userData);

    const authResponse = await request(app).post('/api/auth/login').send({
      email: createdUser.email,
      password: user.password,
    });

    const response = await request(app)
      .get(`/api/books/${faker.string.uuid()}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`);

    expect(response.status).toBe(404);
  });

  test("POST /api/books should return 400 when book's start_date is invalid", async () => {
    const { body: createdUser } = await request(app)
      .post('/api/users')
      .send(userData);

    const authResponse = await request(app).post('/api/auth/login').send({
      email: createdUser.email,
      password: user.password,
    });

    const response = await request(app)
      .post('/api/books')
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send({
        ...bookData,
        user_id: createdUser.id,
        start_date: 'invalid_date',
      });

    expect(response.status).toBe(400);
  });
});
