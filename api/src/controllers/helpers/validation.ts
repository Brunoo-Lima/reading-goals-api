import { badRequest } from './http';
import validator from 'validator';

export const invalidIdResponse = () =>
  badRequest({
    code: 'INVALID_ID',
    message: 'Invalid id',
  });

export const checkIfIdIsValid = (id: string) => validator.isUUID(id);
