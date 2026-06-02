import { IdGeneratorAdapter } from '../../adapters';
import {
  CreateNoteController,
  GetNoteByIdController,
  GetNotesByUserIdController,
  UpdateNoteController,
} from '../../controllers';
import {
  PostgresCreateNoteRepository,
  PostgresDeleteNoteRepository,
  PostgresGetBookByIdRepository,
  PostgresGetNoteByIdRepository,
  PostgresGetNotesByUserIdRepository,
  PostgresGetUserByIdRepository,
  PostgresUpdateNoteRepository,
} from '../../repositories/postgres';
import {
  CreateNoteUseCase,
  GetNoteByIdUseCase,
  GetNotesByUserIdUseCase,
  UpdateNoteUseCase,
} from '../../use-cases';

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

export const makeGetNoteByIdController = () => {
  const getNoteByIdRepository = new PostgresGetNoteByIdRepository();
  const getUserByIdRepository = new PostgresGetUserByIdRepository();

  const getNoteByIdUseCase = new GetNoteByIdUseCase(
    getNoteByIdRepository,
    getUserByIdRepository,
  );

  const getNoteByIdController = new GetNoteByIdController(getNoteByIdUseCase);

  return getNoteByIdController;
};

export const makeUpdateNoteController = () => {
  const updateNoteRepository = new PostgresUpdateNoteRepository();
  const getNoteByIdRepository = new PostgresGetNoteByIdRepository();
  const getBookByIdRepository = new PostgresGetBookByIdRepository();

  const updateNoteUseCase = new UpdateNoteUseCase(
    updateNoteRepository,
    getNoteByIdRepository,
    getBookByIdRepository,
  );

  const updateNoteController = new UpdateNoteController(updateNoteUseCase);

  return updateNoteController;
};

export const makeDeleteNoteController = () => {
  const deleteNoteRepository = new PostgresDeleteNoteRepository();
  const getNoteByIdRepository = new PostgresGetNoteByIdRepository();
  const getBookByIdRepository = new PostgresGetBookByIdRepository();

  const deleteNoteUseCase = new UpdateNoteUseCase(
    deleteNoteRepository,
    getNoteByIdRepository,
    getBookByIdRepository,
  );

  const deleteNoteController = new UpdateNoteController(deleteNoteUseCase);

  return deleteNoteController;
};
