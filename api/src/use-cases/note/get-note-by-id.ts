import { NoteNotFoundError, UserNotFoundError } from '../../errors';
import type {
  IGetNoteByIdRepository,
  IGetUserByIdRepository,
} from '../../interfaces/repositories';

export class GetNoteByIdUseCase {
  private getNoteByIdRepository: IGetNoteByIdRepository;
  private getUserByIdRepository: IGetUserByIdRepository;

  constructor(
    getNoteByIdRepository: IGetNoteByIdRepository,
    getUserByIdRepository: IGetUserByIdRepository,
  ) {
    this.getNoteByIdRepository = getNoteByIdRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }

  async execute(noteId: string, userId: string) {
    const user = await this.getUserByIdRepository.execute(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const note = await this.getNoteByIdRepository.execute(noteId);

    if (!note) {
      throw new NoteNotFoundError();
    }

    return note;
  }
}
