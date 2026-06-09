import { app } from '../../app';
import { user } from '../../tests';
import request from 'supertest';

describe('User Routes E2E tests', () => {
  test('POST /api/users should return 201 when user is created', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        ...user,
        id: undefined,
        created_at: undefined,
        updated_at: undefined,
      });

    expect(response.status).toBe(201);
  });

  test('GET /api/users should return 200 when user is found', async () => {
    const { body: createdUser } = await request(app)
      .post('/api/users')
      .send({
        ...user,
        id: undefined,
        created_at: undefined,
        updated_at: undefined,
      });

    const authResponse = await request(app).post('/api/auth/login').send({
      email: createdUser.email,
      password: user.password,
    });

    const response = await request(app)
      .get('/api/users/me')
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdUser.id);
  });

  test('PATCH /api/users/me should return 200 when user is updated', async () => {
    const { body: createdUser, status: createStatus } = await request(app)
      .post('/api/users')
      .send({
        ...user,
        id: undefined,
        created_at: undefined,
        updated_at: undefined,
      });

    console.log(
      '[test] createUser status:',
      createStatus,
      '| body:',
      createdUser,
    );

    const authResponse = await request(app).post('/api/auth/login').send({
      email: createdUser.email,
      password: user.password,
    });

    console.log(
      '[test] auth status:',
      authResponse.status,
      '| body:',
      authResponse.body,
    );

    const response = await request(app)
      .patch('/api/users/me')
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`)
      .send({ name: 'John Doe' });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('John Doe');
  });

  test('DELETE /api/users/me should return 200 when user is deleted', async () => {
    const { body: createdUser } = await request(app)
      .post('/api/users')
      .send({
        ...user,
        id: undefined,
        created_at: undefined,
        updated_at: undefined,
      });

    const authResponse = await request(app).post('/api/auth/login').send({
      email: createdUser.email,
      password: user.password,
    });

    const response = await request(app)
      .delete('/api/users/me')
      .set(`Authorization`, `Bearer ${authResponse.body.tokens.accessToken}`);

    expect(response.status).toBe(200);
  });

  test('POST /api/users should return 400 when the provided email is already in use', async () => {
    const { body: createdUser } = await request(app)
      .post('/api/users')
      .send({
        ...user,
        id: undefined,
        created_at: undefined,
        updated_at: undefined,
      });

    const response = await request(app)
      .post('/api/users')
      .send({
        ...user,
        id: undefined,
        created_at: undefined,
        updated_at: undefined,
        email: createdUser.email,
      });

    expect(response.status).toBe(400);
  });

  test('POST /api/users should return 400 when the provided password is invalid', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        ...user,
        id: undefined,
        created_at: undefined,
        updated_at: undefined,
        password: '123',
      });

    expect(response.status).toBe(400);
  });
});
