import { notFound } from './http';

export const userNotFoundResponse = () =>
  notFound({
    code: 'USER_NOT_FOUND',
    message: 'User not found',
  });
