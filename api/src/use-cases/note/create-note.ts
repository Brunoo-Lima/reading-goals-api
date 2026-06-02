import type { INote } from '../../@types/INote';
import {
  BookNotFoundError,
  NotePageNumberExceedsTotalPagesError,
} from '../../errors';
import type { IIdGeneratorAdapter } from '../../interfaces/adapters';
import type {
  ICreateNoteRepository,
  IGetBookByIdRepository,
} from '../../interfaces/repositories';

export class CreateNoteUseCase {
  private createNoteRepository: ICreateNoteRepository;
  private getBookByIdRepository: IGetBookByIdRepository;
  private idGeneratorAdapter: IIdGeneratorAdapter;

  constructor(
    createNoteRepository: ICreateNoteRepository,
    getBookByIdRepository: IGetBookByIdRepository,
    idGeneratorAdapter: IIdGeneratorAdapter,
  ) {
    this.createNoteRepository = createNoteRepository;
    this.getBookByIdRepository = getBookByIdRepository;
    this.idGeneratorAdapter = idGeneratorAdapter;
  }

  async execute(noteParams: INote, bookId: string) {
    const book = await this.getBookByIdRepository.execute(bookId);

    if (!book) {
      throw new BookNotFoundError();
    }

    if (noteParams.page_number && noteParams.page_number > book.total_pages) {
      throw new NotePageNumberExceedsTotalPagesError();
    }

    const noteId = this.idGeneratorAdapter.execute();

    const note = {
      ...noteParams,
      id: noteId,
      book_id: book.id,
    };

    return await this.createNoteRepository.execute(note);
  }
}
