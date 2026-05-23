import { Router, type IRouter, type Request, type Response } from 'express';
import { makeCreateGoalController } from '../factories/controllers';
import { auth } from '../middlewares/auth';

const goalRoutes: IRouter = Router();

goalRoutes.post('/', auth, async (request: Request, response: Response) => {
  const createGoalController = makeCreateGoalController();

  request.params.userId = request.userId as string;

  const { statusCode, body } = await createGoalController.execute(request);

  return response.status(statusCode).send(body);
});

export { goalRoutes };
