import { faker } from '@faker-js/faker';
import {
  ForbiddenError,
  GoalNotFoundError,
  GoalProgressExceedsTargetError,
} from '../../../errors';
import { goal, goalProgress } from '../../../tests';
import { CreateGoalProgressUseCase } from '../create-goal-progress';

describe('Create Goal Progress Use Case', () => {
  const goalData = {
    ...goal,
    id: undefined as any,
    target_value: 100,
    current_value: 20,
  };

  const goalProgressData = {
    ...goalProgress,
    id: undefined as any,
    user_id: goal.user_id,
    value: 10,
  };

  class CreateGoalProgressRepositoryStub {
    async execute() {
      return {
        goal: goalData,
        progress: goalProgressData,
      };
    }
  }

  class GetGoalByIdRepositoryStub {
    async execute() {
      return goalData;
    }
  }

  class IdGeneratorAdapterStub {
    execute() {
      return 'generated_id';
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

    const result = await sut.execute(goalProgressData);

    expect(result).toEqual({
      goal: goalData,
      progress: goalProgressData,
    });
  });

  test('should return GoalNotFoundError if goal is not found', async () => {
    const { sut, getGoalByIdRepository } = makeSut();
    vi.spyOn(getGoalByIdRepository, 'execute').mockResolvedValueOnce(
      null as any,
    );

    const promise = sut.execute(goalProgressData);

    await expect(promise).rejects.toThrow(
      new GoalNotFoundError(goalProgressData.goal_id),
    );
  });

  test("should return ForbiddenError if user doesn't have permission", async () => {
    const { sut } = makeSut();

    const promise = sut.execute({
      ...goalProgressData,
      user_id: faker.string.uuid(),
    });

    await expect(promise).rejects.toThrow(
      new ForbiddenError("You don't have permission to update this goal"),
    );
  });

  test('should return GoalProgressExceedsTargetError if goal progress exceeds target', async () => {
    const { sut } = makeSut();

    const promise = sut.execute({
      ...goalProgressData,
      value: goal.target_value + 1,
    });

    await expect(promise).rejects.toThrow(new GoalProgressExceedsTargetError());
  });

  test('should throw if CreateGoalProgressRepository throws', async () => {
    const { sut, createGoalProgressRepository } = makeSut();
    vi.spyOn(createGoalProgressRepository, 'execute').mockRejectedValueOnce(
      new Error(),
    );

    const promise = sut.execute(goalProgressData);

    await expect(promise).rejects.toThrow();
  });

  test('should throw if GetGoalByIdRepository throws', async () => {
    const { sut, getGoalByIdRepository } = makeSut();
    vi.spyOn(getGoalByIdRepository, 'execute').mockRejectedValueOnce(
      new Error(),
    );

    const promise = sut.execute(goalProgressData);

    await expect(promise).rejects.toThrow();
  });

  test('should throw if IdGeneratorAdapter throws', async () => {
    const { sut, idGeneratorAdapter } = makeSut();
    vi.spyOn(idGeneratorAdapter, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.execute(goalProgressData);

    await expect(promise).rejects.toThrow();
  });
});
