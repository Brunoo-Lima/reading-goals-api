import { IdGeneratorAdapter } from '../../adapters';
import {
  CreateNoteController,
  DeleteNoteController,
  GetNoteByIdController,
  GetNotesByBookIdController,
  UpdateNoteController,
} from '../../controllers';
import {
  PostgresCreateNoteRepository,
  PostgresDeleteNoteRepository,
  PostgresGetBookByIdRepository,
  PostgresGetNoteByIdRepository,
  PostgresGetNotesByBookIdRepository,
  PostgresGetUserByIdRepository,
  PostgresUpdateNoteRepository,
} from '../../repositories/postgres';
import {
  CreateNoteUseCase,
  DeleteNoteUseCase,
  GetNoteByIdUseCase,
  GetNotesByBookIdUseCase,
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

export const makeGetNotesByBookIdController = () => {
  const getNotesByBookIdRepository = new PostgresGetNotesByBookIdRepository();
  const getUserByIdRepository = new PostgresGetUserByIdRepository();

  const getNotesByBookIdUseCase = new GetNotesByBookIdUseCase(
    getNotesByBookIdRepository,
    getUserByIdRepository,
  );

  const getNotesByBookIdController = new GetNotesByBookIdController(
    getNotesByBookIdUseCase,
  );

  return getNotesByBookIdController;
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

  const deleteNoteUseCase = new DeleteNoteUseCase(
    deleteNoteRepository,
    getNoteByIdRepository,
  );

  const deleteNoteController = new DeleteNoteController(deleteNoteUseCase);

  return deleteNoteController;
};
