import type { Request } from 'express';
import { NoteNotFoundError, UserNotFoundError } from '../../errors';
import {
  checkIfIdIsValid,
  invalidIdResponse,
  noteNotFoundResponse,
  ok,
  serverError,
  userNotFoundResponse,
} from '../helpers';
import type { IGetNoteByIdUseCase } from '../../interfaces/use-cases';

export class GetNoteByIdController {
  private getNoteByIdUseCase: IGetNoteByIdUseCase;

  constructor(getNoteByIdUseCase: IGetNoteByIdUseCase) {
    this.getNoteByIdUseCase = getNoteByIdUseCase;
  }

  async execute(request: Request) {
    try {
      const noteId = request.params.noteId as string;
      const userId = request.params.userId as string;

      const isUserIdValid = checkIfIdIsValid(userId);
      const isNoteIdValid = checkIfIdIsValid(noteId);

      if (!isUserIdValid || !isNoteIdValid) {
        return invalidIdResponse();
      }

      const note = await this.getNoteByIdUseCase.execute(noteId, userId);

      return ok(note);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return userNotFoundResponse();
      }

      if (error instanceof NoteNotFoundError) {
        return noteNotFoundResponse();
      }

      return serverError();
    }
  }
}
