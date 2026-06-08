import { faker } from '@faker-js/faker';
import { app } from '../../app';
import { book, user } from '../../tests';
import request from 'supertest';

describe('Notes Routes E2E tests', () => {
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
    start_date: '2026-06-08T01:28:00.523Z',
    end_date: '2026-06-19T01:28:00.523Z',
    created_at: undefined,
    updated_at: undefined,
  };

  const noteData = {
    content: 'create note content',
    rating: 5,
    page_number: 300,
  };

  test('POST /api/notes should return 201 when note is created', async () => {
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
      .post(`/api/notes/${createdBook.id}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send(noteData);

    expect(response.status).toBe(201);
  });

  test('GET /api/notes should return 200 when notes are found', async () => {
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

    const { body: createdNote } = await request(app)
      .post(`/api/notes/${createdBook.id}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send(noteData);

    const response = await request(app)
      .get(`/api/notes?bookId=${createdBook.id}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].id).toBe(createdNote.id);
  });

  test('GET /api/notes/:noteId should return 200 when note is found', async () => {
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

    const { body: createdNote } = await request(app)
      .post(`/api/notes/${createdBook.id}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send(noteData);

    const response = await request(app)
      .get(`/api/notes/${createdNote.id}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdNote.id);
  });

  test('PATCH /api/notes/:noteId should return 200 when note is updated', async () => {
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

    const { body: createdNote } = await request(app)
      .post(`/api/notes/${createdBook.id}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send(noteData);

    const response = await request(app)
      .patch(`/api/notes/${createdNote.id}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send({
        ...noteData,
        content: 'updated note content',
      });

    expect(response.status).toBe(200);
  });

  test('DELETE /api/notes/:noteId should return 200 when note is deleted', async () => {
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

    const { body: createdNote } = await request(app)
      .post(`/api/notes/${createdBook.id}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send(noteData);

    const response = await request(app)
      .delete(`/api/notes/${createdNote.id}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`);

    expect(response.status).toBe(200);
  });

  test("DELETE /api/notes/:noteId should return 404 when note doesn't exist", async () => {
    const { body: createdUser } = await request(app)
      .post('/api/users')
      .send(userData);

    const authResponse = await request(app).post('/api/auth/login').send({
      email: createdUser.email,
      password: user.password,
    });

    const response = await request(app)
      .delete(`/api/notes/${faker.string.uuid()}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`);

    expect(response.status).toBe(404);
  });

  test("PATCH /api/notes/:noteId should return 404 when note doesn't exist", async () => {
    const { body: createdUser } = await request(app)
      .post('/api/users')
      .send(userData);

    const authResponse = await request(app).post('/api/auth/login').send({
      email: createdUser.email,
      password: user.password,
    });

    const response = await request(app)
      .patch(`/api/notes/${faker.string.uuid()}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send({
        ...noteData,
        content: 'updated note content',
      });

    expect(response.status).toBe(404);
  });

  test('POST /api/notes/:bookId should return 400 when bookId is invalid', async () => {
    const { body: createdUser } = await request(app)
      .post('/api/users')
      .send(userData);

    const authResponse = await request(app).post('/api/auth/login').send({
      email: createdUser.email,
      password: user.password,
    });

    const response = await request(app)
      .post(`/api/notes/${faker.string.uuid()}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send(noteData);

    expect(response.status).toBe(404);
  });
});
