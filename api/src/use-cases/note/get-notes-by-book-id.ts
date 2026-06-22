import { BookNotFoundError, UserNotFoundError } from '../../errors';
import type {
  IGetNotesByBookIdRepository,
  IGetUserByIdRepository,
} from '../../interfaces/repositories';

export class GetNotesByBookIdUseCase {
  private getNotesByBookIdRepository: IGetNotesByBookIdRepository;
  private getUserByIdRepository: IGetUserByIdRepository;

  constructor(
    getNotesByUserIdRepository: IGetNotesByBookIdRepository,
    getUserByIdRepository: IGetUserByIdRepository,
  ) {
    this.getNotesByBookIdRepository = getNotesByUserIdRepository;
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

    const notes = await this.getNotesByBookIdRepository.execute(userId, bookId);

    return notes;
  }
}
