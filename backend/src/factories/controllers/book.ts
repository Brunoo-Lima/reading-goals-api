import { CreateBookController } from '../../controllers';
import { PostgresCreateBookRepository } from '../../repositories/postgres';
import { CreateBookUseCase } from '../../use-cases';

export const makeCreateBookController = () => {
  const createBookRepository = new PostgresCreateBookRepository();
  const createBookUseCase = new CreateBookUseCase(createBookRepository);

  const createBookController = new CreateBookController(createBookUseCase);

  return createBookController;
};
