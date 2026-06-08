import { UserNotFoundError } from '../../../errors';
import { book, notes, user } from '../../../tests';
import { GetNotesByUserIdUseCase } from '../get-notes-by-user-id';

describe('Get Notes By User Id Use Case', () => {
  class GetNotesByUserIdRepositoryStub {
    async execute() {
      return notes;
    }
  }

  class GetUserByIdRepositoryStub {
    async execute() {
      return user;
    }
  }

  const makeSut = () => {
    const getNotesByUserIdRepository = new GetNotesByUserIdRepositoryStub();
    const getUserByIdRepository = new GetUserByIdRepositoryStub();
    const sut = new GetNotesByUserIdUseCase(
      getNotesByUserIdRepository,
      getUserByIdRepository,
    );

    return {
      sut,
      getNotesByUserIdRepository,
      getUserByIdRepository,
    };
  };

  test('should return an array of notes on success', async () => {
    const { sut } = makeSut();

    const result = await sut.execute(user.id, book.id);

    expect(result).toEqual(notes);
  });

  test('should throw an error if user is not found', async () => {
    const { sut, getUserByIdRepository } = makeSut();

    vi.spyOn(getUserByIdRepository, 'execute').mockResolvedValueOnce(
      null as any,
    );

    const promise = sut.execute(user.id, book.id);

    await expect(promise).rejects.toThrow(new UserNotFoundError());
  });

  test('should return an empty array if user has no notes', async () => {
    const { sut, getNotesByUserIdRepository } = makeSut();

    vi.spyOn(getNotesByUserIdRepository, 'execute').mockResolvedValueOnce([]);

    const result = await sut.execute(user.id, book.id);

    expect(result).toEqual([]);
  });

  test('should throw if GetNotesByUserIdRepository throws', async () => {
    const { sut, getNotesByUserIdRepository } = makeSut();
    vi.spyOn(getNotesByUserIdRepository, 'execute').mockRejectedValueOnce(
      new Error(),
    );

    const promise = sut.execute(user.id);

    await expect(promise).rejects.toThrow();
  });

  test('should throw if GetUserByIdRepository throws', async () => {
    const { sut, getUserByIdRepository } = makeSut();
    vi.spyOn(getUserByIdRepository, 'execute').mockRejectedValueOnce(
      new Error(),
    );

    const promise = sut.execute(user.id);

    await expect(promise).rejects.toThrow();
  });
});
