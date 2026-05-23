import { notFound } from './http';

export const goalNotFoundResponse = () =>
  notFound({
    message: 'Goal not found',
  });
