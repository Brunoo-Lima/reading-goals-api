import { notFound } from './http';

export const goalNotFoundResponse = () =>
  notFound({
    code: 'GOAL_NOT_FOUND',
    message: 'Goal not found',
  });
