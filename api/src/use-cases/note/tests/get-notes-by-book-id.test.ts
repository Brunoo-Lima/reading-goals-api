import { UserNotFoundError } from '../../../errors';
import { book, notes, user } from '../../../tests';
import { GetNotesByBookIdUseCase } from '../get-notes-by-book-id';

describe('Get Notes By Book Id Use Case', () => {
  class GetNotesByBookIdRepositoryStub {
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
    const getNotesByBookIdRepository = new GetNotesByBookIdRepositoryStub();
    const getUserByIdRepository = new GetUserByIdRepositoryStub();
    const sut = new GetNotesByBookIdUseCase(
      getNotesByBookIdRepository,
      getUserByIdRepository,
    );

    return {
      sut,
      getNotesByBookIdRepository,
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
    const { sut, getNotesByBookIdRepository } = makeSut();

    vi.spyOn(getNotesByBookIdRepository, 'execute').mockResolvedValueOnce([]);

    const result = await sut.execute(user.id, book.id);

    expect(result).toEqual([]);
  });

  test('should throw if GetNotesByBookIdRepository throws', async () => {
    const { sut, getNotesByBookIdRepository } = makeSut();
    vi.spyOn(getNotesByBookIdRepository, 'execute').mockRejectedValueOnce(
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
