import {
  ForbiddenError,
  GoalNotFoundError,
  GoalProgressExceedsTargetError,
} from '../../../errors';
import { goalProgress, goal as fakeGoal } from '../../../tests';
import { CreateGoalProgressUseCase } from '../create-goal-progress';

describe('Create Goal Progress Use Case', () => {
  const goal = {
    ...fakeGoal,
    // id: undefined as any,
  };

  class CreateGoalProgressRepositoryStub {
    async execute() {
      return {
        goal,
        progress: goalProgress,
      };
    }
  }

  class GetGoalByIdRepositoryStub {
    async execute() {
      return goal;
    }
  }

  class IdGeneratorAdapterStub {
    execute() {
      return 'progress-id';
    }
  }

  const makeSut = () => {
    const createGoalProgressRepository = new CreateGoalProgressRepositoryStub();
    const getGoalByIdRepository = new GetGoalByIdRepositoryStub();
    const idGeneratorAdapter = new IdGeneratorAdapterStub();

    const sut = new CreateGoalProgressUseCase(
      createGoalProgressRepository,
      getGoalByIdRepository,
      idGeneratorAdapter,
    );

    return {
      sut,
      createGoalProgressRepository,
      getGoalByIdRepository,
      idGeneratorAdapter,
    };
  };

  test('should create a goal progress successfully', async () => {
    const { sut } = makeSut();

    const result = await sut.execute({
      goal_id: goal.id,
      user_id: goal.user_id,
      value: 12,
    });

    expect(result).toEqual({
      goal,
      progress: goalProgress,
    });
  });

  test('should return GoalNotFoundError if goal is not found', async () => {
    const { sut, getGoalByIdRepository } = makeSut();
    vi.spyOn(getGoalByIdRepository, 'execute').mockResolvedValueOnce(
      null as any,
    );

    const result = sut.execute({
      goal_id: 'goal12',
      user_id: '12',
      value: 12,
    });

    await expect(result).rejects.toThrow(GoalNotFoundError);
  });

  test("should return ForbiddenError if user doesn't have permission", async () => {
    const { sut, getGoalByIdRepository } = makeSut();

    vi.spyOn(getGoalByIdRepository, 'execute').mockResolvedValueOnce({
      ...goal,
      user_id: 'other',
    });

    const result = sut.execute({
      goal_id: 'goal12',
      user_id: '12',
      value: 12,
    });

    await expect(result).rejects.toThrow(ForbiddenError);
  });

  test('should return GoalProgressExceedsTargetError if progress exceeds target', async () => {
    const { sut, getGoalByIdRepository } = makeSut();

    vi.spyOn(getGoalByIdRepository, 'execute').mockResolvedValueOnce({
      ...goal,
      target_value: 100,
      user_id: 'user-id',
    });

    const result = sut.execute({
      ...goal,
      user_id: 'user-id',
      goal_id: 'goal-id',
      value: 10000,
    });

    await expect(result).rejects.toThrow(GoalProgressExceedsTargetError);
  });
});
