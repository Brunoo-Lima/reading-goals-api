import request from 'supertest';
import { app } from '../../app';
import { user } from '../../tests';
import { faker } from '@faker-js/faker';

describe('Auth Routes E2E tests', () => {
  test('should POST /api/v1/auth/login should return 200 and tokens when user credentials are valid', async () => {
    const { body: createdUser } = await request(app)
      .post('/api/v1/users')
      .send({
        ...user,
        id: undefined,
        created_at: undefined,
        updated_at: undefined,
      });

    const response = await request(app).post('/api/v1/auth/login').send({
      email: createdUser.email,
      password: user.password,
    });

    expect(response.status).toBe(200);
  });

  test('should POST /api/v1/auth/login should return 401 when user credentials are invalid', async () => {
    const { body: createdUser } = await request(app)
      .post('/api/v1/users')
      .send({
        ...user,
        id: undefined,
        created_at: undefined,
        updated_at: undefined,
      });

    const response = await request(app).post('/api/v1/auth/login').send({
      email: createdUser.email,
      password: faker.internet.password(),
    });

    expect(response.status).toBe(401);
  });

  test('should POST /api/v1/auth/login should return 404 when user email is not found', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: faker.internet.email(),
      password: user.password,
    });

    expect(response.status).toBe(404);
  });

  test('should POST /api/v1/auth/refresh-token should return 200 and tokens when refresh token is valid', async () => {
    const { body: createdUser } = await request(app)
      .post('/api/v1/users')
      .send({
        ...user,
        id: undefined,
        created_at: undefined,
        updated_at: undefined,
      });

    const authResponse = await request(app).post('/api/v1/auth/login').send({
      email: createdUser.email,
      password: user.password,
    });

    const cookies = authResponse.headers['set-cookie'] as string;

    const response = await request(app)
      .post('/api/v1/auth/refresh-token')
      .set('Cookie', cookies);

    expect(response.status).toBe(200);
  });
});
