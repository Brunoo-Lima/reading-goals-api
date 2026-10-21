import { notFound } from './http';

export const bookNotFoundResponse = () =>
  notFound({
    code: 'BOOK_NOT_FOUND',
    message: `Book not found`,
  });
