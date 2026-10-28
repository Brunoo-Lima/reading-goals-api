import { Router, type IRouter, type Request, type Response } from 'express';
import { auth } from '../middlewares/auth';
import { makeChatAgentController } from '../factories/controllers';

const chatRoutes: IRouter = Router();

chatRoutes.post(
  '/agent',
  auth,
  async (request: Request, response: Response) => {
    const controller = makeChatAgentController();

    const { statusCode, body } = await controller.execute(request);

    return response.status(statusCode).send(body);
  },
);

export { chatRoutes };
