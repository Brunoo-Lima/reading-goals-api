import type { Request } from 'express';
import type { IUpdateNoteUseCase } from '../../interfaces/use-cases';
import {
  badRequest,
  bookNotFoundResponse,
  checkIfIdIsValid,
  invalidIdResponse,
  noteNotFoundResponse,
  ok,
  serverError,
} from '../helpers';
import {
  BookNotFoundError,
  NoteNotFoundError,
  NotePageNumberExceedsTotalPagesError,
} from '../../errors';
import { updateNoteSchema } from '../../schemas/note';
import { ZodError } from 'zod';

export class UpdateNoteController {
  private updateNoteUseCase: IUpdateNoteUseCase;

  constructor(updateNoteUseCase: IUpdateNoteUseCase) {
    this.updateNoteUseCase = updateNoteUseCase;
  }

  async execute(request: Request) {
    try {
      const userId = request.params.userId as string;
      const noteId = request.params.noteId as string;

      const isUserIdValid = checkIfIdIsValid(userId);
      const isNoteIdValid = checkIfIdIsValid(noteId);

      if (!isUserIdValid || !isNoteIdValid) {
        return invalidIdResponse();
      }

      const params = request.body;

      await updateNoteSchema.parseAsync(params);

      const updatedNote = await this.updateNoteUseCase.execute(noteId, params);

      return ok(updatedNote);
    } catch (error) {
      if (error instanceof NoteNotFoundError) {
        return noteNotFoundResponse();
      }

      if (error instanceof BookNotFoundError) {
        return bookNotFoundResponse();
      }

      if (error instanceof NotePageNumberExceedsTotalPagesError) {
        return badRequest({ message: error.message });
      }

      if (error instanceof ZodError) {
        return badRequest({ message: error.issues[0]?.message });
      }

      return serverError();
    }
  }
}
