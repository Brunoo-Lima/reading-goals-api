import type { IBook } from '../../@types/IBook';

export interface ICreateBookUseCase {
  execute(book: IBook): Promise<IBook>;
}
