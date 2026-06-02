import { BookNotFoundError, UserNotFoundError } from '../../errors';
import type {
  IGetNotesByUserIdRepository,
  IGetUserByIdRepository,
} from '../../interfaces/repositories';

export class GetNotesByUserIdUseCase {
  private getNotesByUserIdRepository: IGetNotesByUserIdRepository;
  private getUserByIdRepository: IGetUserByIdRepository;

  constructor(
    getNotesByUserIdRepository: IGetNotesByUserIdRepository,
    getUserByIdRepository: IGetUserByIdRepository,
  ) {
    this.getNotesByUserIdRepository = getNotesByUserIdRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }

  async execute(userId: string, bookId?: string) {
    const user = await this.getUserByIdRepository.execute(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (!bookId) {
      throw new BookNotFoundError();
    }

    const notes = await this.getNotesByUserIdRepository.execute(userId, bookId);

    return notes;
  }
}
