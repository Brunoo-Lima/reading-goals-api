import type { IBook } from '../../@types/IBook';

export interface ICreateBookUseCase {
  execute(book: IBook): Promise<IBook>;
}

export interface IGetBookByIdUseCase {
  execute(bookId: string): Promise<IBook | null>;
}
