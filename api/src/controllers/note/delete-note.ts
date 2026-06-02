import type { Request } from 'express';
import type { IDeleteNoteUseCase } from '../../interfaces/use-cases';
import {
  checkIfIdIsValid,
  noteNotFoundResponse,
  ok,
  serverError,
} from '../helpers';
import { NoteNotFoundError } from '../../errors';

export class DeleteNoteController {
  private deleteNoteUseCase: IDeleteNoteUseCase;

  constructor(deleteNoteUseCase: IDeleteNoteUseCase) {
    this.deleteNoteUseCase = deleteNoteUseCase;
  }

  async execute(request: Request) {
    try {
      const userId = request.params.userId as string;
      const noteId = request.params.noteId as string;

      const isUserIdValid = checkIfIdIsValid(userId);
      const isNoteIdValid = checkIfIdIsValid(noteId);

      if (!isUserIdValid || !isNoteIdValid) {
        return noteNotFoundResponse();
      }

      const deletedNote = await this.deleteNoteUseCase.execute(noteId);

      return ok(deletedNote);
    } catch (error) {
      if (error instanceof NoteNotFoundError) {
        return noteNotFoundResponse();
      }

      return serverError();
    }
  }
}
