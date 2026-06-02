import { IdGeneratorAdapter } from '../../adapters';
import {
  CreateGoalController,
  GetGoalByIdController,
  GetGoalsController,
  UpdateGoalController,
} from '../../controllers';
import { DeleteGoalController } from '../../controllers/goal/delete-goal';
import {
  PostgresCreateGoalRepository,
  PostgresDeleteGoalRepository,
  PostgresGetGoalByIdRepository,
  PostgresGetGoalsRepository,
  PostgresGetUserByIdRepository,
  PostgresUpdateGoalRepository,
} from '../../repositories/postgres';
import {
  CreateGoalUseCase,
  DeleteGoalUseCase,
  GetGoalByIdUseCase,
  GetGoalsUseCase,
  UpdateGoalUseCase,
} from '../../use-cases';

export const makeCreateGoalController = () => {
  const createGoalRepository = new PostgresCreateGoalRepository();
  const getUserByIdRepository = new PostgresGetUserByIdRepository();
  const idGeneratorAdapter = new IdGeneratorAdapter();

  const createGoalUseCase = new CreateGoalUseCase(
    createGoalRepository,
    getUserByIdRepository,
    idGeneratorAdapter,
  );

  const createGoalController = new CreateGoalController(createGoalUseCase);

  return createGoalController;
};

export const makeGetGoalsController = () => {
  const getGoalsRepository = new PostgresGetGoalsRepository();
  const getUserByIdRepository = new PostgresGetUserByIdRepository();

  const getGoalsUseCase = new GetGoalsUseCase(
    getGoalsRepository,
    getUserByIdRepository,
  );

  const getGoalsController = new GetGoalsController(getGoalsUseCase);

  return getGoalsController;
};

export const makeGetGoalByIdController = () => {
  const getGoalByIdRepository = new PostgresGetGoalByIdRepository();
  const getGoalByIdUseCase = new GetGoalByIdUseCase(getGoalByIdRepository);

  const getGoalByIdController = new GetGoalByIdController(getGoalByIdUseCase);

  return getGoalByIdController;
};

export const makeUpdateGoalController = () => {
  const updateGoalRepository = new PostgresUpdateGoalRepository();
  const getGoalByIdRepository = new PostgresGetGoalByIdRepository();

  const updateGoalUseCase = new UpdateGoalUseCase(
    updateGoalRepository,
    getGoalByIdRepository,
  );

  const updateGoalController = new UpdateGoalController(updateGoalUseCase);

  return updateGoalController;
};

export const makeDeleteGoalController = () => {
  const deleteGoalRepository = new PostgresDeleteGoalRepository();
  const getGoalByIdRepository = new PostgresGetGoalByIdRepository();

  const deleteGoalUseCase = new DeleteGoalUseCase(
    deleteGoalRepository,
    getGoalByIdRepository,
  );

  const deleteGoalController = new DeleteGoalController(deleteGoalUseCase);

  return deleteGoalController;
};
