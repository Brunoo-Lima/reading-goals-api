import type { Request } from 'express';
import type { ICreateNoteUseCase } from '../../interfaces/use-cases';
import {
  badRequest,
  bookNotFoundResponse,
  checkIfIdIsValid,
  created,
  invalidIdResponse,
  serverError,
} from '../helpers';
import { ZodError } from 'zod';
import { BookNotFoundError } from '../../errors';
import { createNoteSchema } from '../../schemas/note';

export class CreateNoteController {
  private createNoteUseCase: ICreateNoteUseCase;

  constructor(createNoteUseCase: ICreateNoteUseCase) {
    this.createNoteUseCase = createNoteUseCase;
  }

  async execute(request: Request) {
    try {
      const bookId = request.params.bookId as string;
      const userId = request.params.userId as string;

      const isBookIdValid = checkIfIdIsValid(bookId);
      const isUserIdValid = checkIfIdIsValid(userId);

      if (!isBookIdValid || !isUserIdValid) {
        return invalidIdResponse();
      }

      const params = request.body;

      await createNoteSchema.parseAsync(params);

      const noteData = {
        ...params,
        book_id: bookId,
        user_id: userId,
      };

      const note = await this.createNoteUseCase.execute(noteData, bookId);

      return created(note);
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest({ message: error.issues[0]?.message });
      }

      if (error instanceof BookNotFoundError) {
        return bookNotFoundResponse();
      }

      return serverError();
    }
  }
}
