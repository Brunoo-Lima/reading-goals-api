import {
  BookNotFoundError,
  NoteNotFoundError,
  NotePageNumberExceedsTotalPagesError,
} from '../../../errors';
import { book, note } from '../../../tests';
import { UpdateNoteUseCase } from '../update-note';

describe('Update Note Use Case', () => {
  class UpdateNoteRepositoryStub {
    async execute() {
      return note;
    }
  }

  class GetNoteByIdRepositoryStub {
    async execute() {
      return note;
    }
  }

  class GetBookByIdRepositoryStub {
    async execute() {
      return book;
    }
  }

  const makeSut = () => {
    const updateNoteRepository = new UpdateNoteRepositoryStub();
    const getNoteByIdRepository = new GetNoteByIdRepositoryStub();
    const getBookByIdRepository = new GetBookByIdRepositoryStub();

    const sut = new UpdateNoteUseCase(
      updateNoteRepository,
      getNoteByIdRepository,
      getBookByIdRepository,
    );

    return {
      sut,
      updateNoteRepository,
      getNoteByIdRepository,
      getBookByIdRepository,
    };
  };

  test('should update a note successfully', async () => {
    const { sut } = makeSut();

    const updateNoteParams = {
      content: 'Updated note content',
      page_number: 50,
      rating: 4,
      book_id: book.id,
      user_id: note.user_id,
    };

    const updatedNote = await sut.execute(note.id, updateNoteParams);

    expect(updatedNote).toEqual(note);
  });

  test('should throw an error if note is not found', async () => {
    const { sut, getNoteByIdRepository } = makeSut();
    vi.spyOn(getNoteByIdRepository, 'execute').mockResolvedValueOnce(
      null as any,
    );

    const promise = sut.execute('invalid-note-id', note);

    await expect(promise).rejects.toThrow(new NoteNotFoundError());
  });

  test('should throw an error if book is not found', async () => {
    const { sut, getBookByIdRepository } = makeSut();
    vi.spyOn(getBookByIdRepository, 'execute').mockResolvedValueOnce(
      null as any,
    );

    const promise = sut.execute(note.id, note);

    await expect(promise).rejects.toThrow(new BookNotFoundError());
  });

  test("should throw an error if note's page number exceeds book's total pages", async () => {
    const { sut } = makeSut();

    const updateNoteParams = {
      content: 'Updated note content',
      page_number: book.total_pages + 1, // Exceed total pages
      rating: 4,
      book_id: book.id,
      user_id: note.user_id,
    };

    const promise = sut.execute(note.id, updateNoteParams);

    await expect(promise).rejects.toThrow(
      new NotePageNumberExceedsTotalPagesError(),
    );
  });

  test('should throw if GetNoteByIdRepository throws', async () => {
    const { sut, getNoteByIdRepository } = makeSut();
    vi.spyOn(getNoteByIdRepository, 'execute').mockRejectedValueOnce(
      new Error(),
    );

    const promise = sut.execute(note.id, note);

    await expect(promise).rejects.toThrow();
  });

  test('should throw if GetBookByIdRepository throws', async () => {
    const { sut, getBookByIdRepository } = makeSut();
    vi.spyOn(getBookByIdRepository, 'execute').mockRejectedValueOnce(
      new Error(),
    );

    const promise = sut.execute(note.id, note);

    await expect(promise).rejects.toThrow();
  });

  test('should throw if UpdateNoteRepository throws', async () => {
    const { sut, updateNoteRepository } = makeSut();
    vi.spyOn(updateNoteRepository, 'execute').mockRejectedValueOnce(
      new Error(),
    );

    const promise = sut.execute(note.id, note);

    await expect(promise).rejects.toThrow();
  });
});
