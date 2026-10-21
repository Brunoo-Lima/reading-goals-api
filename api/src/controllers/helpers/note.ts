import { notFound } from './http';

export const noteNotFoundResponse = () =>
  notFound({
    code: 'NOTE_NOT_FOUND',
    message: 'Note not found',
  });
