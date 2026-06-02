import { NoteNotFoundError } from '../../errors';
import type {
  IDeleteNoteRepository,
  IGetNoteByIdRepository,
} from '../../interfaces/repositories';

export class DeleteNoteUseCase {
  private deleteNoteRepository: IDeleteNoteRepository;
  private getNoteByIdRepository: IGetNoteByIdRepository;

  constructor(
    deleteNoteRepository: IDeleteNoteRepository,
    getNoteByIdRepository: IGetNoteByIdRepository,
  ) {
    this.deleteNoteRepository = deleteNoteRepository;
    this.getNoteByIdRepository = getNoteByIdRepository;
  }

  async execute(noteId: string) {
    const note = await this.getNoteByIdRepository.execute(noteId);

    if (!note) {
      throw new NoteNotFoundError();
    }

    return await this.deleteNoteRepository.execute(noteId);
  }
}
