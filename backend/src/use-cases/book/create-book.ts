import type { IBook } from '../../@types/IBook';
import type { ICreateBookRepository } from '../../interfaces/repositories';

export class CreateBookUseCase {
  private createBookRepository: ICreateBookRepository;

  constructor(createBookRepository: ICreateBookRepository) {
    this.createBookRepository = createBookRepository;
  }

  async execute(book: IBook) {
    return await this.createBookRepository.execute(book);
  }
}
