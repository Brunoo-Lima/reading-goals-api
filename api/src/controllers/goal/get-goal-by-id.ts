import type { Request } from 'express';
import type { IGetGoalByIdUseCase } from '../../interfaces/use-cases';
import {
  checkIfIdIsValid,
  goalNotFoundResponse,
  invalidIdResponse,
  ok,
  serverError,
} from '../helpers';
import { GoalNotFoundError } from '../../errors';

export class GetGoalByIdController {
  private getGoalByIdUseCase: IGetGoalByIdUseCase;
  constructor(getGoalByIdUseCase: IGetGoalByIdUseCase) {
    this.getGoalByIdUseCase = getGoalByIdUseCase;
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

      const goal = await this.getGoalByIdUseCase.execute(goalId, userId);

      return ok(goal);
    } catch (error) {
      if (error instanceof GoalNotFoundError) {
        return goalNotFoundResponse();
      }

      return serverError();
    }
  }
}
