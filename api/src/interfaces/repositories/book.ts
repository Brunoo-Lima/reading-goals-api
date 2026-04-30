import type { IBook } from '../../@types/IBook';

export interface ICreateBookRepository {
  execute(book: IBook): Promise<IBook>;
}
