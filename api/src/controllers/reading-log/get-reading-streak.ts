import type { Request } from 'express';
import type { IGetReadingStreakUseCase } from '../../interfaces/use-cases';
import {
  checkIfIdIsValid,
  invalidIdResponse,
  ok,
  serverError,
  userNotFoundResponse,
} from '../helpers';
import { UserNotFoundError } from '../../errors';

export class GetReadingStreakController {
  private getReadingStreakUseCase: IGetReadingStreakUseCase;

  constructor(getReadingStreakUseCase: IGetReadingStreakUseCase) {
    this.getReadingStreakUseCase = getReadingStreakUseCase;
  }

  async execute(request: Request) {
    try {
      const userId = request.params.userId as string;

      if (!checkIfIdIsValid(userId)) return invalidIdResponse();

      const readingStreak = await this.getReadingStreakUseCase.execute(userId);

      return ok(readingStreak);
    } catch (error) {
      if (error instanceof UserNotFoundError) return userNotFoundResponse();

      return serverError();
    }
  }
}
