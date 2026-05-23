import { IdGeneratorAdapter } from '../../adapters';
import { CreateGoalController, GetGoalByIdController } from '../../controllers';
import {
  PostgresCreateGoalRepository,
  PostgresGetGoalByIdRepository,
  PostgresGetUserByIdRepository,
} from '../../repositories/postgres';
import { CreateGoalUseCase, GetGoalByIdUseCase } from '../../use-cases';

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

export const makeGetGoalByIdController = () => {
  const getGoalByIdRepository = new PostgresGetGoalByIdRepository();
  const getGoalByIdUseCase = new GetGoalByIdUseCase(getGoalByIdRepository);

  const getGoalByIdController = new GetGoalByIdController(getGoalByIdUseCase);

  return getGoalByIdController;
};
