import request from 'supertest';
import { app } from '../../app';
import { book, user } from '../../tests';

describe('Reading Logs Routes E2E tests', () => {
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

  const readingLogData = {
    pages_read: 300,
    date: '2026-06-10T01:28:00.523Z',
  };

  test('POST /api/reading-logs should return 201 when reading log is created', async () => {
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
      .send(bookData);

    const response = await request(app)
      .post(`/api/reading-logs?bookId=${createdBook.id}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send(readingLogData);

    expect(response.status).toBe(201);
  });

  test('GET /api/reading-logs should return 200 when reading logs are found', async () => {
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
      .send(bookData);

    const { body: createdReadingLog } = await request(app)
      .post(`/api/reading-logs?bookId=${createdBook.id}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send(readingLogData);

    const response = await request(app)
      .get(`/api/reading-logs?bookId=${createdBook.id}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].id).toBe(createdReadingLog.id);
  });

  test('GET /api/reading-logs/book should return 200 when reading log is found', async () => {
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
      .send(bookData);

    const { body: createdReadingLog } = await request(app)
      .post(`/api/reading-logs?bookId=${createdBook.id}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send(readingLogData);

    const response = await request(app)
      .get(`/api/reading-logs/book?bookId=${createdBook.id}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body[0].id).toBe(createdReadingLog.id);
  });
});
