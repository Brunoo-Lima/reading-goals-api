import type { Request } from 'express';
import type { IUpdateGoalUseCase } from '../../interfaces/use-cases';
import {
  badRequest,
  checkIfIdIsValid,
  forbidden,
  goalNotFoundResponse,
  invalidIdResponse,
  ok,
  serverError,
} from '../helpers';
import { ForbiddenError, GoalNotFoundError } from '../../errors';
import { ZodError } from 'zod';
import { updateGoalSchema } from '../../schemas';

export class UpdateGoalController {
  private updateGoalUseCase: IUpdateGoalUseCase;

  constructor(updateGoalUseCase: IUpdateGoalUseCase) {
    this.updateGoalUseCase = updateGoalUseCase;
  }

  async execute(request: Request) {
    try {
      const goalId = request.params.goalId as string;
      const userId = request.params.userId as string;

      const isGoalIdValid = checkIfIdIsValid(goalId);
      const isUserIdValid = checkIfIdIsValid(userId);

      if (!isGoalIdValid || !isUserIdValid) {
        return invalidIdResponse();
      }

      const params = request.body;

      await updateGoalSchema.parseAsync(params);

      const goalData = {
        ...params,
        user_id: userId,
      };

      const goal = await this.updateGoalUseCase.execute(goalId, goalData);

      return ok(goal);
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest({ message: error.issues[0]?.message });
      }

      if (error instanceof GoalNotFoundError) {
        return goalNotFoundResponse();
      }

      if (error instanceof ForbiddenError) {
        return forbidden();
      }

      return serverError();
    }
  }
}
