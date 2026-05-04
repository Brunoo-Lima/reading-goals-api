import { BookNotFoundError } from '../../errors';
import type { IGetBookByIdRepository } from '../../interfaces/repositories';

export class GetBookByIdUseCase {
  private getBookByIdRepository: IGetBookByIdRepository;

  constructor(getBookByIdRepository: IGetBookByIdRepository) {
    this.getBookByIdRepository = getBookByIdRepository;
  }

  async execute(bookId: string) {
    const book = await this.getBookByIdRepository.execute(bookId);

    if (!book) {
      throw new BookNotFoundError();
    }

    return book;
  }
}
