import { Router, type IRouter, type Request, type Response } from 'express';
import { makeCreateUseController } from '../factories/controllers/user';

const userRoutes: IRouter = Router();

userRoutes.post('/api/users', async (req: Request, res: Response) => {
  const createUserController = makeCreateUseController();
  await createUserController.execute(res, req);
});

export { userRoutes };
