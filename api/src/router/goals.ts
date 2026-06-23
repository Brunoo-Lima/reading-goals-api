import { Router, type IRouter, type Request, type Response } from 'express';
import {
  makeCreateGoalController,
  makeCreateGoalProgressController,
  makeDeleteGoalController,
  makeGetGoalByIdController,
  makeGetGoalsController,
  makeUpdateGoalController,
} from '../factories/controllers';
import { auth } from '../middlewares/auth';

const goalRoutes: IRouter = Router();

goalRoutes.post('/', auth, async (request: Request, response: Response) => {
  const createGoalController = makeCreateGoalController();

  request.params.userId = request.userId as string;

  const { statusCode, body } = await createGoalController.execute(request);

  return response.status(statusCode).send(body);
});

goalRoutes.get('/', auth, async (request: Request, response: Response) => {
  const getGoalsController = makeGetGoalsController();

  request.params.userId = request.userId as string;

  const { statusCode, body } = await getGoalsController.execute(request);

  return response.status(statusCode).send(body);
});

goalRoutes.post(
  '/:goalId/progress',
  auth,
  async (request: Request, response: Response) => {
    const createGoalProgressController = makeCreateGoalProgressController();

    request.params.userId = request.userId as string;

    const { statusCode, body } =
      await createGoalProgressController.execute(request);

    return response.status(statusCode).send(body);
  },
);

goalRoutes.get(
  '/:goalId',
  auth,
  async (request: Request, response: Response) => {
    const getGoalByIdController = makeGetGoalByIdController();

    request.params.userId = request.userId as string;

    const { statusCode, body } = await getGoalByIdController.execute(request);

    return response.status(statusCode).send(body);
  },
);

goalRoutes.patch(
  '/:goalId',
  auth,
  async (request: Request, response: Response) => {
    const updateGoalController = makeUpdateGoalController();

    request.params.userId = request.userId as string;

    const { statusCode, body } = await updateGoalController.execute(request);

    return response.status(statusCode).send(body);
  },
);

goalRoutes.delete(
  '/:goalId',
  auth,
  async (request: Request, response: Response) => {
    const deleteGoalController = makeDeleteGoalController();

    request.params.userId = request.userId as string;

    const { statusCode, body } = await deleteGoalController.execute(request);

    return response.status(statusCode).send(body);
  },
);

export { goalRoutes };
