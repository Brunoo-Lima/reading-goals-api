import { IdGeneratorAdapter } from '../../adapters';
import {
  CreateGoalController,
  GetGoalByIdController,
  GetGoalsController,
} from '../../controllers';
import {
  PostgresCreateGoalRepository,
  PostgresGetGoalByIdRepository,
  PostgresGetGoalsRepository,
  PostgresGetUserByIdRepository,
} from '../../repositories/postgres';
import {
  CreateGoalUseCase,
  GetGoalByIdUseCase,
  GetGoalsUseCase,
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
