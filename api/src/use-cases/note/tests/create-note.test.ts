import { faker } from '@faker-js/faker';
import { book, note } from '../../../tests';
import { CreateNoteUseCase } from '../create-note';
import { BookNotFoundError } from '../../../errors';

describe('Create Note Use Case', () => {
  class CreateNoteRepositoryStub {
    async execute() {
      return note;
    }
  }

  class GetBookByIdRepositoryStub {
    async execute() {
      return book;
    }
  }

  class IdGeneratorAdapterStub {
    execute() {
      return 'generated_id';
    }
  }

  const makeSut = () => {
    const createNoteRepository = new CreateNoteRepositoryStub();
    const getBookByIdRepository = new GetBookByIdRepositoryStub();
    const idGeneratorAdapter = new IdGeneratorAdapterStub();

    const sut = new CreateNoteUseCase(
      createNoteRepository,
      getBookByIdRepository,
      idGeneratorAdapter,
    );

    return {
      sut,
      createNoteRepository,
      getBookByIdRepository,
      idGeneratorAdapter,
    };
  };

  test('should create a note successfully', async () => {
    const { sut } = makeSut();

    const result = await sut.execute(note, book.id);

    expect(result).toEqual(note);
  });

  test('should return BookNotFoundError if book is not found', async () => {
    const { sut, getBookByIdRepository } = makeSut();
    vi.spyOn(getBookByIdRepository, 'execute').mockResolvedValueOnce(
      null as any,
    );

    const promise = sut.execute(note, faker.string.uuid());

    await expect(promise).rejects.toThrow(new BookNotFoundError());
  });

  test('should throw if CreateNoteRepository throws', async () => {
    const { sut, createNoteRepository } = makeSut();
    vi.spyOn(createNoteRepository, 'execute').mockRejectedValueOnce(
      new Error(),
    );

    const promise = sut.execute(note, book.id);

    await expect(promise).rejects.toThrow();
  });

  test('should throw if GetBookByIdRepository throws', async () => {
    const { sut, getBookByIdRepository } = makeSut();
    vi.spyOn(getBookByIdRepository, 'execute').mockRejectedValueOnce(
      new Error(),
    );

    const promise = sut.execute(note, book.id);

    await expect(promise).rejects.toThrow();
  });

  test('should throw if IdGeneratorAdapter throws', async () => {
    const { sut, idGeneratorAdapter } = makeSut();
    vi.spyOn(idGeneratorAdapter, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.execute(note, book.id);

    await expect(promise).rejects.toThrow();
  });
});
