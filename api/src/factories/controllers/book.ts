import { CreateBookController } from '../../controllers';
import {
  PostgresCreateBookRepository,
  PostgresGetBookByTitleRepository,
} from '../../repositories/postgres';
import { CreateBookUseCase } from '../../use-cases';

export const makeCreateBookController = () => {
  const createBookRepository = new PostgresCreateBookRepository();
  const getBookByTitleRepository = new PostgresGetBookByTitleRepository();
  const createBookUseCase = new CreateBookUseCase(
    createBookRepository,
    getBookByTitleRepository,
  );

  const createBookController = new CreateBookController(createBookUseCase);

  return createBookController;
};
