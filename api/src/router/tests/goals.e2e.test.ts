import { faker } from '@faker-js/faker';
import { app } from '../../app';
import { book, goal, user } from '../../tests';
import request from 'supertest';

describe('Goals Routes E2E tests', () => {
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
    end_date: '2026-10-07T01:28:00.523Z',
    created_at: undefined,
    updated_at: undefined,
  };

  const goalData = {
    ...goal,
    id: undefined,
    target_value: 20,
    current_value: 2,
    start_date: '2026-06-07T01:28:00.523Z',
    end_date: '2026-06-29T01:28:00.523Z',
    created_at: undefined,
    updated_at: undefined,
  };

  test('POST /api/goals should return 201 when goal is created', async () => {
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
      .post(`/api/goals?bookId=${createdBook.id}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send({
        ...goalData,
        user_id: createdUser.id,
      });

    expect(response.status).toBe(201);
  });

  test('GET /api/goals should return 200 when goals are found', async () => {
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

    const { body: createdGoal } = await request(app)
      .post(`/api/goals?bookId=${createdBook.id}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send({
        ...goalData,
        user_id: createdUser.id,
      });

    const response = await request(app)
      .get('/api/goals')
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body[0].id).toBe(createdGoal.id);
  });

  test('GET /api/goals/:goalId should return 200 when goal is found', async () => {
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

    const { body: createdGoal } = await request(app)
      .post(`/api/goals?bookId=${createdBook.id}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send({
        ...goalData,
        user_id: createdUser.id,
      });

    const response = await request(app)
      .get(`/api/goals/${createdGoal.id}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdGoal.id);
  });

  test('PATCH /api/goals/:goalId should return 200 when goal is updated', async () => {
    const { body: createdUser } = await request(app)
      .post('/api/users')
      .send(userData);

    const authResponse = await request(app).post('/api/auth/login').send({
      email: createdUser.email,
      password: user.password,
    });

    // const { body: createdBook } = await request(app)
    //   .post('/api/books')
    //   .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
    //   .send({
    //     ...bookData,
    //     user_id: createdUser.id,
    //   });

    const { body: createdGoal } = await request(app)
      .post(`/api/goals`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send({
        ...goalData,
        user_id: createdUser.id,
      });

    const response = await request(app)
      .patch(`/api/goals/${createdGoal.id}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send({
        ...goalData,
        user_id: createdUser.id,
        target_value: 50,
        book_id: undefined,
      });

    expect(response.status).toBe(200);
  });

  test('DELETE /api/goals/:goalId should return 200 when goal is deleted', async () => {
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

    const { body: createdGoal } = await request(app)
      .post(`/api/goals?bookId=${createdBook.id}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send({
        ...goalData,
        user_id: createdUser.id,
      });

    const response = await request(app)
      .delete(`/api/goals/${createdGoal.id}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`);

    expect(response.status).toBe(200);
  });

  test('DELETE /api/goals/:goalId should return 404 when goal is not found', async () => {
    const { body: createdUser } = await request(app)
      .post('/api/users')
      .send(userData);

    const authResponse = await request(app).post('/api/auth/login').send({
      email: createdUser.email,
      password: user.password,
    });

    const response = await request(app)
      .delete(`/api/goals/${faker.string.uuid()}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`);

    expect(response.status).toBe(404);
  });

  test('PATCH /api/goals/:goalId should return 404 when goal is not found', async () => {
    const { body: createdUser } = await request(app)
      .post('/api/users')
      .send(userData);

    const authResponse = await request(app).post('/api/auth/login').send({
      email: createdUser.email,
      password: user.password,
    });

    const response = await request(app)
      .patch(`/api/goals/${faker.string.uuid()}`)
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send({
        ...goalData,
        user_id: createdUser.id,
        target_value: 50,
      });

    expect(response.status).toBe(404);
  });

  test('POST /api/goals should return 400 when goal is invalid', async () => {
    const { body: createdUser } = await request(app)
      .post('/api/users')
      .send(userData);

    const authResponse = await request(app).post('/api/auth/login').send({
      email: createdUser.email,
      password: user.password,
    });

    const response = await request(app)
      .post('/api/goals')
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send({
        ...goalData,
        user_id: createdUser.id,
        target_value: -1,
      });

    expect(response.status).toBe(400);
  });
});
