import { goal } from '../../../tests';
import { DeleteGoalUseCase } from '../delete-goal';

describe('Delete Goal Use Case', () => {
  class DeleteGoalRepositoryStub {
    async execute() {
      return goal;
    }
  }

  class GetGoalRepositoryStub {
    async execute() {
      return goal;
    }
  }

  const makeSut = () => {
    const deleteGoalRepository = new DeleteGoalRepositoryStub();
    const getGoalRepository = new GetGoalRepositoryStub();

    const sut = new DeleteGoalUseCase(deleteGoalRepository, getGoalRepository);

    return {
      sut,
      deleteGoalRepository,
      getGoalRepository,
    };
  };

  test('should delete a goal successfully', async () => {
    const { sut } = makeSut();

    const result = await sut.execute(goal.id);

    expect(result).toEqual(goal);
  });

  test('should throw an error if the goal does not exist', async () => {
    const { sut, getGoalRepository } = makeSut();

    vi.spyOn(getGoalRepository, 'execute').mockResolvedValueOnce(null as any);

    await expect(sut.execute(goal.id)).rejects.toThrow();
  });

  test('should throw DeleteGoalRepository throws', async () => {
    const { sut, deleteGoalRepository } = makeSut();

    vi.spyOn(deleteGoalRepository, 'execute').mockRejectedValueOnce(
      new Error(),
    );

    const promise = sut.execute(goal.id);

    await expect(promise).rejects.toThrow();
  });

  test('should throw GetGoalRepository throws', async () => {
    const { sut, getGoalRepository } = makeSut();

    vi.spyOn(getGoalRepository, 'execute').mockRejectedValueOnce(new Error());

    const promise = sut.execute(goal.id);

    await expect(promise).rejects.toThrow();
  });
});
