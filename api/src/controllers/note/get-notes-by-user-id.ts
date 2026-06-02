import type { Request } from 'express';
import type { IGetNotesByUserIdUseCase } from '../../interfaces/use-cases';
import {
  bookNotFoundResponse,
  checkIfIdIsValid,
  invalidIdResponse,
  ok,
  serverError,
  userNotFoundResponse,
} from '../helpers';
import { BookNotFoundError, UserNotFoundError } from '../../errors';

export class GetNotesByUserIdController {
  private getNotesByUserIdUseCase: IGetNotesByUserIdUseCase;

  constructor(getNotesByUserIdUseCase: IGetNotesByUserIdUseCase) {
    this.getNotesByUserIdUseCase = getNotesByUserIdUseCase;
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

      const notes = await this.getNotesByUserIdUseCase.execute(userId, bookId);

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
