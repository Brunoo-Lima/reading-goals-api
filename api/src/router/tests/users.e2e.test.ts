import { app } from '../../app';
import { user } from '../../tests';
import request from 'supertest';

describe('User Routes E2E tests', () => {
  const userData = {
    ...user,
    id: undefined,
    created_at: undefined,
    updated_at: undefined,
  };

  test('POST /api/v1/users should return 201 when user is created', async () => {
    const response = await request(app).post('/api/v1/users').send(userData);

    expect(response.status).toBe(201);
  });

  test('GET /api/v1/users should return 200 when user is found', async () => {
    const { body: createdUser } = await request(app)
      .post('/api/v1/users')
      .send(userData);

    const authResponse = await request(app).post('/api/v1/auth/login').send({
      email: createdUser.email,
      password: userData.password,
    });

    const cookies = authResponse.headers['set-cookie'] as string;

    const response = await request(app)
      .get('/api/v1/users/me')
      .set('Cookie', cookies);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdUser.id);
  });

  test('PATCH /api/v1/users/me should return 200 when user is updated', async () => {
    const { body: createdUser } = await request(app)
      .post('/api/v1/users')
      .send(userData);

    const authResponse = await request(app).post('/api/v1/auth/login').send({
      email: createdUser.email,
      password: userData.password,
    });

    const cookies = authResponse.headers['set-cookie'] as string;

    const response = await request(app)
      .patch('/api/v1/users/me')
      .set('Cookie', cookies)
      .send({ name: 'John Doe' });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('John Doe');
  });

  test('DELETE /api/v1/users/me should return 200 when user is deleted', async () => {
    const { body: createdUser } = await request(app)
      .post('/api/v1/users')
      .send(userData);

    const authResponse = await request(app).post('/api/v1/auth/login').send({
      email: createdUser.email,
      password: userData.password,
    });

    const cookies = authResponse.headers['set-cookie'] as string;

    const response = await request(app)
      .delete('/api/v1/users/me')
      .set('Cookie', cookies);

    expect(response.status).toBe(200);
  });

  test('POST /api/v1/users should return 400 when the provided email is already in use', async () => {
    const { body: createdUser } = await request(app)
      .post('/api/v1/users')
      .send(userData);

    const response = await request(app)
      .post('/api/v1/users')
      .send({
        ...userData,
        email: createdUser.email,
      });

    expect(response.status).toBe(400);
  });

  test('POST /api/v1/users should return 400 when the provided password is invalid', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        ...userData,
        password: '123',
      });

    expect(response.status).toBe(400);
  });
});
