import { Router, type IRouter, type Request, type Response } from 'express';
import { auth } from '../middlewares/auth';
import {
  makeCreateNoteController,
  makeDeleteNoteController,
  makeGetNoteByIdController,
  makeGetNotesByBookIdController,
  makeUpdateNoteController,
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
  const getNotesByUserIdController = makeGetNotesByBookIdController();

  request.params.userId = request.userId as string;

  const { statusCode, body } =
    await getNotesByUserIdController.execute(request);

  return response.status(statusCode).send(body);
});

noteRoutes.get(
  '/:noteId',
  auth,
  async (request: Request, response: Response) => {
    const getNoteByIdController = makeGetNoteByIdController();

    request.params.userId = request.userId as string;

    const { statusCode, body } = await getNoteByIdController.execute(request);

    return response.status(statusCode).send(body);
  },
);

noteRoutes.patch(
  '/:noteId',
  auth,
  async (request: Request, response: Response) => {
    const updateNoteController = makeUpdateNoteController();

    request.params.userId = request.userId as string;

    const { statusCode, body } = await updateNoteController.execute(request);

    return response.status(statusCode).send(body);
  },
);

noteRoutes.delete(
  '/:noteId',
  auth,
  async (request: Request, response: Response) => {
    const deleteNoteController = makeDeleteNoteController();

    request.params.userId = request.userId as string;

    const { statusCode, body } = await deleteNoteController.execute(request);

    return response.status(statusCode).send(body);
  },
);

export { noteRoutes };
