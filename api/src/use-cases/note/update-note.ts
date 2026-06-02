import type { IUpdateNote } from '../../@types/INote';
import {
  BookNotFoundError,
  NoteNotFoundError,
  NotePageNumberExceedsTotalPagesError,
} from '../../errors';
import type {
  IGetBookByIdRepository,
  IGetNoteByIdRepository,
  IUpdateNoteRepository,
} from '../../interfaces/repositories';

export class UpdateNoteUseCase {
  private updateNoteRepository: IUpdateNoteRepository;
  private getNoteByIdRepository: IGetNoteByIdRepository;
  private getBookByIdRepository: IGetBookByIdRepository;

  constructor(
    updateNoteRepository: IUpdateNoteRepository,
    getNoteByIdRepository: IGetNoteByIdRepository,
    getBookByIdRepository: IGetBookByIdRepository,
  ) {
    this.updateNoteRepository = updateNoteRepository;
    this.getNoteByIdRepository = getNoteByIdRepository;
    this.getBookByIdRepository = getBookByIdRepository;
  }

  async execute(noteId: string, updateNoteParams: IUpdateNote) {
    const note = await this.getNoteByIdRepository.execute(noteId);

    if (!note) {
      throw new NoteNotFoundError();
    }

    const book = await this.getBookByIdRepository.execute(note.book_id);

    if (!book) {
      throw new BookNotFoundError();
    }

    if (
      updateNoteParams.page_number &&
      updateNoteParams.page_number > book.total_pages
    ) {
      throw new NotePageNumberExceedsTotalPagesError();
    }

    const updatedNote = await this.updateNoteRepository.execute(
      noteId,
      updateNoteParams,
    );

    return updatedNote;
  }
}
