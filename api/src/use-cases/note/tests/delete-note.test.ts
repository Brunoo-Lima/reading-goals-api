import { NoteNotFoundError } from '../../../errors';
import { note } from '../../../tests';
import { DeleteNoteUseCase } from '../delete-note';

describe('Delete Note Use Case', () => {
  class DeleteNoteRepositoryStub {
    async execute() {
      return note;
    }
  }

  class GetNoteByIdRepositoryStub {
    async execute() {
      return note;
    }
  }

  const makeSut = () => {
    const deleteNoteRepository = new DeleteNoteRepositoryStub();
    const getNoteByIdRepository = new GetNoteByIdRepositoryStub();

    const sut = new DeleteNoteUseCase(
      deleteNoteRepository,
      getNoteByIdRepository,
    );

    return {
      sut,
      deleteNoteRepository,
      getNoteByIdRepository,
    };
  };

  test('should delete a note successfully', async () => {
    const { sut } = makeSut();

    const result = await sut.execute(note.id);

    expect(result).toBeTruthy();
    expect(result).toBeDefined();
  });

  test('should throw if GetNoteByIdRepository throws', async () => {
    const { sut, getNoteByIdRepository } = makeSut();
    vi.spyOn(getNoteByIdRepository, 'execute').mockRejectedValueOnce(
      new Error(),
    );

    const promise = sut.execute(note.id);

    await expect(promise).rejects.toThrow();
  });

  test('should throw if DeleteNoteRepository throws', async () => {
    const { sut, deleteNoteRepository } = makeSut();
    vi.spyOn(deleteNoteRepository, 'execute').mockRejectedValueOnce(
      new Error(),
    );

    const promise = sut.execute(note.id);

    await expect(promise).rejects.toThrow();
  });

  test('should throw if note is not found', async () => {
    const { sut, getNoteByIdRepository } = makeSut();
    vi.spyOn(getNoteByIdRepository, 'execute').mockResolvedValueOnce(
      null as any,
    );

    const promise = sut.execute(note.id);

    await expect(promise).rejects.toThrow(new NoteNotFoundError());
  });
});
