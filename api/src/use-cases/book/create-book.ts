import type { IBook } from '../../@types/IBook';
import { BookAlreadyExistsError, InvalidBookDatesError } from '../../errors';
import type { IIdGeneratorAdapter } from '../../interfaces/adapters';
import type {
  ICreateBookRepository,
  IGetBookByTitleRepository,
} from '../../interfaces/repositories';

export class CreateBookUseCase {
  private createBookRepository: ICreateBookRepository;
  private getBookByTitleRepository: IGetBookByTitleRepository;
  private idGeneratorAdapter: IIdGeneratorAdapter;

  constructor(
    createBookRepository: ICreateBookRepository,
    getBookByTitleRepository: IGetBookByTitleRepository,
    idGeneratorAdapter: IIdGeneratorAdapter,
  ) {
    this.createBookRepository = createBookRepository;
    this.getBookByTitleRepository = getBookByTitleRepository;
    this.idGeneratorAdapter = idGeneratorAdapter;
  }

  async execute(book: IBook) {
    const bookAlreadyExists = await this.getBookByTitleRepository.execute(
      book.title,
    );

    if (bookAlreadyExists) {
      throw new BookAlreadyExistsError();
    }

    if (book.start_date && book.end_date && book.end_date < book.start_date) {
      throw new InvalidBookDatesError();
    }

    const bookId = this.idGeneratorAdapter.execute();

    const bookData = {
      ...book,
      id: bookId,
    };

    return await this.createBookRepository.execute(bookData);
  }
}
