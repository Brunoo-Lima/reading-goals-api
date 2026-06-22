import type { Request } from 'express';
import {
  bookNotFoundResponse,
  checkIfIdIsValid,
  invalidIdResponse,
  ok,
  serverError,
  userNotFoundResponse,
} from '../helpers';
import { BookNotFoundError, UserNotFoundError } from '../../errors';
import type { IGetNotesByBookIdUseCase } from '../../interfaces/use-cases';

export class GetNotesByBookIdController {
  private getNotesByBookIdUseCase: IGetNotesByBookIdUseCase;

  constructor(getNotesByBookIdUseCase: IGetNotesByBookIdUseCase) {
    this.getNotesByBookIdUseCase = getNotesByBookIdUseCase;
  }

  async execute(request: Request) {
    try {
      const userId = request.params.userId as string;
      const bookId = request.query.bookId as string;

      const isIdValid = checkIfIdIsValid(userId);
      const isBookIdValid = checkIfIdIsValid(bookId);

      if (!isIdValid || !isBookIdValid) {
        return invalidIdResponse();
      }

      const notes = await this.getNotesByBookIdUseCase.execute(userId, bookId);

      return ok(notes);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return userNotFoundResponse();
      }

      if (error instanceof BookNotFoundError) {
        return bookNotFoundResponse();
      }

      return serverError();
    }
  }
}
