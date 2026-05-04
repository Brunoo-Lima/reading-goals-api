import { Router, type IRouter, type Request, type Response } from 'express';
import {
  makeCreateUseController,
  makeDeleteUserController,
} from '../factories/controllers';
import { auth } from '../middlewares/auth';

const userRoutes: IRouter = Router();

userRoutes.post('/', async (request: Request, response: Response) => {
  const createUserController = makeCreateUseController();
  const { statusCode, body } = await createUserController.execute(request);

  return response.status(statusCode).send(body);
});

userRoutes.delete('/me', auth, async (request: Request, response: Response) => {
  const deleteUserController = makeDeleteUserController();

  request.params.userId = request.userId as string;

  const { statusCode, body } = await deleteUserController.execute(request);

  return response.status(statusCode).send(body);
});

export { userRoutes };
