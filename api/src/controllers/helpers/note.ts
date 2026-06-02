import { notFound } from './http';

export const noteNotFoundResponse = () =>
  notFound({
    message: 'Note not found',
  });
