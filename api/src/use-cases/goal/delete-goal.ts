import { GoalNotFoundError } from '../../errors';
import type {
  IDeleteGoalRepository,
  IGetGoalByIdRepository,
} from '../../interfaces/repositories';

export class DeleteGoalUseCase {
  private deleteGoalRepository: IDeleteGoalRepository;
  private getGoalByIdRepository: IGetGoalByIdRepository;

  constructor(
    deleteGoalRepository: IDeleteGoalRepository,
    getGoalByIdRepository: IGetGoalByIdRepository,
  ) {
    this.deleteGoalRepository = deleteGoalRepository;
    this.getGoalByIdRepository = getGoalByIdRepository;
  }

  async execute(goalId: string) {
    const goal = await this.getGoalByIdRepository.execute(goalId);

    if (!goal) {
      throw new GoalNotFoundError();
    }

    return await this.deleteGoalRepository.execute(goalId);
  }
}
