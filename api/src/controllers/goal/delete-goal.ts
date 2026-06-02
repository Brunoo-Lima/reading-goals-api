import type { Request } from 'express';
import type { IDeleteGoalUseCase } from '../../interfaces/use-cases';
import {
  checkIfIdIsValid,
  goalNotFoundResponse,
  invalidIdResponse,
  ok,
  serverError,
} from '../helpers';
import { GoalNotFoundError } from '../../errors';

export class DeleteGoalController {
  private deleteGoalUseCas: IDeleteGoalUseCase;

  constructor(deleteGoalUseCas: IDeleteGoalUseCase) {
    this.deleteGoalUseCas = deleteGoalUseCas;
  }

  async execute(request: Request) {
    try {
      const userId = request.params.userId as string;
      const goalId = request.params.goalId as string;

      const isUserIdValid = checkIfIdIsValid(userId);
      const isGoalIdValid = checkIfIdIsValid(goalId);

      if (!isUserIdValid || !isGoalIdValid) {
        return invalidIdResponse();
      }

      const deletedGoal = await this.deleteGoalUseCas.execute(goalId);

      return ok(deletedGoal);
    } catch (error) {
      if (error instanceof GoalNotFoundError) {
        return goalNotFoundResponse();
      }

      return serverError();
    }
  }
}
