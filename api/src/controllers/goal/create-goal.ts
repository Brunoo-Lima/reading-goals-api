import type { Request } from 'express';
import { UserNotFoundError } from '../../errors';
import {
  badRequest,
  checkIfIdIsValid,
  created,
  invalidIdResponse,
  serverError,
  userNotFoundResponse,
} from '../helpers';
import type { ICreateGoalUseCase } from '../../interfaces/use-cases';
import { ZodError } from 'zod';
import { createGoalSchema } from '../../schemas';

export class CreateGoalController {
  private createGoalUseCase: ICreateGoalUseCase;

  constructor(createGoalUseCase: ICreateGoalUseCase) {
    this.createGoalUseCase = createGoalUseCase;
  }

  async execute(request: Request) {
    try {
      const userId = request.params.userId as string;
      const bookId = request.query.bookId as string | undefined;

      const isBookIdValid = checkIfIdIsValid(bookId || '');
      const isUserIdValid = checkIfIdIsValid(userId);

      if (!isUserIdValid || !isBookIdValid) {
        return invalidIdResponse();
      }

      const params = request.body;

      const goalData = {
        ...params,
        user_id: userId,
        book_id: bookId,
      };

      await createGoalSchema.parseAsync(goalData);

      const createGoal = await this.createGoalUseCase.execute(goalData);

      return created(createGoal);
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest({ message: error.issues[0]?.message });
      }

      if (error instanceof UserNotFoundError) {
        return userNotFoundResponse();
      }

      return serverError();
    }
  }
}
