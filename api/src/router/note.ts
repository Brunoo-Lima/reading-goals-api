import { Router, type IRouter, type Request, type Response } from 'express';
import { auth } from '../middlewares/auth';
import {
  makeCreateNoteController,
  makeGetNotesByUserIdController,
} from '../factories/controllers';

const noteRoutes: IRouter = Router();

noteRoutes.post(
  '/:bookId',
  auth,
  async (request: Request, response: Response) => {
    const createNoteController = makeCreateNoteController();

    request.params.userId = request.userId as string;

    const { statusCode, body } = await createNoteController.execute(request);

    return response.status(statusCode).send(body);
  },
);

noteRoutes.get('/', auth, async (request: Request, response: Response) => {
  const getNotesByUserIdController = makeGetNotesByUserIdController();

  request.params.userId = request.userId as string;

  const { statusCode, body } =
    await getNotesByUserIdController.execute(request);

  return response.status(statusCode).send(body);
});

export { noteRoutes };
