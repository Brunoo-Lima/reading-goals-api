import { IdGeneratorAdapter } from '../../adapters';
import { CreateNoteController } from '../../controllers';
import {
  PostgresCreateNoteRepository,
  PostgresGetBookByIdRepository,
} from '../../repositories/postgres';
import { CreateNoteUseCase } from '../../use-cases';

export const makeCreateNoteController = () => {
  const createNoteRepository = new PostgresCreateNoteRepository();
  const getBookByIdRepository = new PostgresGetBookByIdRepository();
  const idGeneratorAdapter = new IdGeneratorAdapter();

  const createNoteUseCase = new CreateNoteUseCase(
    createNoteRepository,
    getBookByIdRepository,
    idGeneratorAdapter,
  );

  const createNoteController = new CreateNoteController(createNoteUseCase);

  return createNoteController;
};
