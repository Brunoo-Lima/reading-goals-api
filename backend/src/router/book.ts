import { Router, type IRouter, type Request, type Response } from 'express';
import { makeCreateBookController } from '../factories/controllers/book';

const bookRoutes: IRouter = Router();

bookRoutes.post('/api/books', async (req: Request, res: Response) => {
  const createBookController = makeCreateBookController();
  const { statusCode, body } = await createBookController.execute(req);

  return res.status(statusCode).json(body);
});

export { bookRoutes };
