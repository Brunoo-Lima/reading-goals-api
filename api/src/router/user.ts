import { Router, type IRouter, type Request, type Response } from 'express';
import { makeCreateUseController } from '../factories/controllers';

const userRoutes: IRouter = Router();

userRoutes.post('/', async (request: Request, response: Response) => {
  const createUserController = makeCreateUseController();
  const { statusCode, body } = await createUserController.execute(request);

  return response.status(statusCode).send(body);
});

export { userRoutes };
