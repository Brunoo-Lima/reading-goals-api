import { NoteNotFoundError, UserNotFoundError } from '../../../errors';
import { note, user } from '../../../tests';
import { GetNoteByIdUseCase } from '../get-note-by-id';

describe('Get Note By Id Use Case', () => {
  class GetNoteByIdRepositoryStub {
    async execute() {
      return note;
    }
  }

  class GetUserByIdRepositoryStub {
    async execute() {
      return user;
    }
  }

  const makeSut = () => {
    const getNoteByIdRepositoryStub = new GetNoteByIdRepositoryStub();
    const getUserByIdRepositoryStub = new GetUserByIdRepositoryStub();

    const sut = new GetNoteByIdUseCase(
      getNoteByIdRepositoryStub,
      getUserByIdRepositoryStub,
    );

    return {
      sut,
      getNoteByIdRepositoryStub,
      getUserByIdRepositoryStub,
    };
  };

  test('Should return a note on success', async () => {
    const { sut } = makeSut();

    const result = await sut.execute(note.id, user.id);

    expect(result).toEqual(note);
  });

  test('Should throw an error if user is not found', async () => {
    const { sut, getUserByIdRepositoryStub } = makeSut();

    vi.spyOn(getUserByIdRepositoryStub, 'execute').mockResolvedValueOnce(
      null as any,
    );

    const promise = sut.execute(note.id, user.id);

    await expect(promise).rejects.toThrow(new UserNotFoundError());
  });

  test('Should throw an error if note is not found', async () => {
    const { sut, getNoteByIdRepositoryStub } = makeSut();

    vi.spyOn(getNoteByIdRepositoryStub, 'execute').mockResolvedValueOnce(
      null as any,
    );

    const promise = sut.execute(note.id, user.id);

    await expect(promise).rejects.toThrow(new NoteNotFoundError());
  });
});
