import { Router, type IRouter, type Request, type Response } from 'express';
import {
  makeLoginController,
  makeRefreshTokenController,
} from '../factories/controllers';

const authRoutes: IRouter = Router();

authRoutes.post('/login', async (request: Request, response: Response) => {
  const loginController = makeLoginController();
  const { statusCode, body } = await loginController.execute(request);

  return response.status(statusCode).send(body);
});

authRoutes.post(
  '/refresh-token',
  async (request: Request, response: Response) => {
    const refreshTokenController = makeRefreshTokenController();
    const { statusCode, body } = await refreshTokenController.execute(request);

    return response.status(statusCode).send(body);
  },
);

export { authRoutes };
