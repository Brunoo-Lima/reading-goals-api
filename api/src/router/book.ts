import { Router, type IRouter, type Request, type Response } from 'express';
import { makeCreateBookController } from '../factories/controllers';
import { auth } from '../middlewares/auth';

const bookRoutes: IRouter = Router();

bookRoutes.post('/', auth, async (request: Request, response: Response) => {
  const createBookController = makeCreateBookController();
  const { statusCode, body } = await createBookController.execute({
    ...request.body,
    user_id: request.userId,
  });

  return response.status(statusCode).json(body);
});

export { bookRoutes };
