import type { ICreateGoalProgressParams } from '../../@types/IGoalProgress';
import {
  ForbiddenError,
  GoalNotFoundError,
  GoalProgressExceedsTargetError,
} from '../../errors';
import type { IIdGeneratorAdapter } from '../../interfaces/adapters';
import type {
  ICreateGoalProgressRepository,
  IGetGoalByIdRepository,
} from '../../interfaces/repositories';

export class CreateGoalProgressUseCase {
  private createGoalProgressRepository: ICreateGoalProgressRepository;
  private getGoalByIdRepository: IGetGoalByIdRepository;
  private idGeneratorAdapter: IIdGeneratorAdapter;

  constructor(
    createGoalProgressRepository: ICreateGoalProgressRepository,
    getGoalByIdRepository: IGetGoalByIdRepository,
    idGeneratorAdapter: IIdGeneratorAdapter,
  ) {
    this.createGoalProgressRepository = createGoalProgressRepository;
    this.getGoalByIdRepository = getGoalByIdRepository;
    this.idGeneratorAdapter = idGeneratorAdapter;
  }

  async execute(goalProgressParams: ICreateGoalProgressParams) {
    const goal = await this.getGoalByIdRepository.execute(
      goalProgressParams.goal_id,
    );

    if (!goal) {
      throw new GoalNotFoundError(goalProgressParams.goal_id);
    }

    if (goal.user_id !== goalProgressParams.user_id) {
      throw new ForbiddenError("You don't have permission to update this goal");
    }

    const nextCurrentValue = goal.current_value + goalProgressParams.value;

    if (nextCurrentValue > goal.target_value) {
      throw new GoalProgressExceedsTargetError();
    }

    const goalProgressId = this.idGeneratorAdapter.execute();

    const goalProgress = {
      id: goalProgressId,
      goal_id: goalProgressParams.goal_id,
      value: goalProgressParams.value,
    };

    return await this.createGoalProgressRepository.execute({
      ...goalProgress,
      ...(goalProgressParams.note !== undefined && {
        note: goalProgressParams.note,
      }),
      ...(goalProgressParams.logged_at !== undefined && {
        logged_at: goalProgressParams.logged_at,
      }),
    });
  }
}
