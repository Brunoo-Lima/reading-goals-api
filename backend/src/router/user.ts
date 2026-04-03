import { Router, type IRouter, type Request, type Response } from 'express';
import { makeCreateUseController } from '../factories/controllers/user';

const userRoutes: IRouter = Router();

userRoutes.post('/api/users', async (req: Request, res: Response) => {
  const createUserController = makeCreateUseController();
  const { statusCode, body } = await createUserController.execute(req);

  return res.status(statusCode).json(body);
});

export { userRoutes };
