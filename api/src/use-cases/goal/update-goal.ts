import type { IUpdateGoal } from '../../@types/IGoal';
import { ForbiddenError, GoalNotFoundError } from '../../errors';
import type {
  IGetGoalByIdRepository,
  IUpdateGoalRepository,
} from '../../interfaces/repositories';

export class UpdateGoalUseCase {
  private updateGoalRepository: IUpdateGoalRepository;
  private getGoalByIdRepository: IGetGoalByIdRepository;

  constructor(
    updateGoalRepository: IUpdateGoalRepository,
    getGoalByIdRepository: IGetGoalByIdRepository,
  ) {
    this.updateGoalRepository = updateGoalRepository;
    this.getGoalByIdRepository = getGoalByIdRepository;
  }

  async execute(goalId: string, updateGoalParams: IUpdateGoal) {
    const goal = await this.getGoalByIdRepository.execute(goalId);

    if (!goal) throw new GoalNotFoundError(goalId);

    if (goal.user_id !== updateGoalParams.user_id)
      throw new ForbiddenError("You don't have permission to update this goal");

    const updatedGoal = await this.updateGoalRepository.execute(
      goalId,
      updateGoalParams,
    );

    return updatedGoal;
  }
}
