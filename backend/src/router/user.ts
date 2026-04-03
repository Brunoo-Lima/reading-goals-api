import { Router, type IRouter, type Request, type Response } from 'express';
import { CreateUserUseCase } from '../use-cases/user/create-user';
import { PostgresCreateUserRepository } from '../repositories/postgres/user/create-user';
import { CreateUserController } from '../controllers/user/create-user';

const userRoutes: IRouter = Router();

userRoutes.post('/api/users', async (req: Request, res: Response) => {
  const createUserRepository = new PostgresCreateUserRepository();
  const createUserUseCase = new CreateUserUseCase(createUserRepository);

  const createUserController = new CreateUserController(createUserUseCase);

  await createUserController.execute(res, req);
});

export { userRoutes };
