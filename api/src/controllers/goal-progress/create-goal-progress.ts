import type { Request } from 'express';
import { ZodError } from 'zod';
import {
  ForbiddenError,
  GoalNotFoundError,
  GoalProgressExceedsTargetError,
} from '../../errors';
import type { ICreateGoalProgressUseCase } from '../../interfaces/use-cases';
import { createGoalProgressSchema } from '../../schemas';
import {
  badRequest,
  checkIfIdIsValid,
  created,
  forbidden,
  goalNotFoundResponse,
  invalidIdResponse,
  serverError,
} from '../helpers';

export class CreateGoalProgressController {
  private createGoalProgressUseCase: ICreateGoalProgressUseCase;

  constructor(createGoalProgressUseCase: ICreateGoalProgressUseCase) {
    this.createGoalProgressUseCase = createGoalProgressUseCase;
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

      await createGoalProgressSchema.parseAsync(params);

      const goalProgressData = {
        ...params,
        goal_id: goalId,
        user_id: userId,
      };

      const goalProgress =
        await this.createGoalProgressUseCase.execute(goalProgressData);

      return created(goalProgress);
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

      if (error instanceof GoalProgressExceedsTargetError) {
        return badRequest({ message: error.message });
      }

      return serverError();
    }
  }
}
