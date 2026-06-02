import { IdGeneratorAdapter } from '../../adapters';
import {
  CreateNoteController,
  GetNotesByUserIdController,
} from '../../controllers';
import {
  PostgresCreateNoteRepository,
  PostgresGetBookByIdRepository,
  PostgresGetNotesByUserIdRepository,
  PostgresGetUserByIdRepository,
} from '../../repositories/postgres';
import { CreateNoteUseCase, GetNotesByUserIdUseCase } from '../../use-cases';

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

export const makeGetNotesByUserIdController = () => {
  const getNotesByUserIdRepository = new PostgresGetNotesByUserIdRepository();
  const getUserByIdRepository = new PostgresGetUserByIdRepository();

  const getNotesByUserIdUseCase = new GetNotesByUserIdUseCase(
    getNotesByUserIdRepository,
    getUserByIdRepository,
  );

  const getNotesByUserIdController = new GetNotesByUserIdController(
    getNotesByUserIdUseCase,
  );

  return getNotesByUserIdController;
};
