import type { Request } from 'express';
import type { IGetNotesByUserIdUseCase } from '../../interfaces/use-cases';
import {
  checkIfIdIsValid,
  invalidIdResponse,
  ok,
  serverError,
  userNotFoundResponse,
} from '../helpers';
import { UserNotFoundError } from '../../errors';

export class GetNotesByUserIdController {
  private getNotesByUserIdUseCase: IGetNotesByUserIdUseCase;

  constructor(getNotesByUserIdUseCase: IGetNotesByUserIdUseCase) {
    this.getNotesByUserIdUseCase = getNotesByUserIdUseCase;
  }

  async execute(request: Request) {
    try {
      const userId = request.params.userId as string;

      const isIdValid = checkIfIdIsValid(userId);

      if (!isIdValid) {
        return invalidIdResponse();
      }

      const notes = await this.getNotesByUserIdUseCase.execute(userId);

      return ok(notes);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return userNotFoundResponse();
      }

      return serverError();
    }
  }
}
