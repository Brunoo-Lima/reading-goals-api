import { Router, type IRouter, type Request, type Response } from 'express';
import {
  makeForgotPasswordController,
  makeLoginController,
  makeRefreshTokenController,
  makeResetPasswordController,
} from '../factories/controllers';

const authRoutes: IRouter = Router();

authRoutes.post('/login', async (request: Request, response: Response) => {
  const loginController = makeLoginController();
  const { statusCode, body } = await loginController.execute(request, response);

  return response.status(statusCode).send(body);
});

authRoutes.post(
  '/refresh-token',
  async (request: Request, response: Response) => {
    const refreshTokenController = makeRefreshTokenController();
    const { statusCode, body } = await refreshTokenController.execute(request);

    if (statusCode === 200 && 'accessToken' in body) {
      response.cookie('accessToken', body.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000, // 15min, mesmo tempo do jwt.sign
        path: '/',
      });

      if ('refreshToken' in body) {
        response.cookie('refreshToken', body.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000, // ajustar conforme rememberMe
          path: '/',
        });
      }

      return response.status(statusCode).send({});
    }

    return response.status(statusCode).send(body);
  },
);

authRoutes.post(
  '/forgot-password',
  async (request: Request, response: Response) => {
    const forgotPasswordController = makeForgotPasswordController();
    const { statusCode, body } =
      await forgotPasswordController.execute(request);

    return response.status(statusCode).send(body);
  },
);

authRoutes.post(
  '/reset-password',
  async (request: Request, response: Response) => {
    const resetPasswordController = makeResetPasswordController();
    const { statusCode, body } = await resetPasswordController.execute(request);

    return response.status(statusCode).send(body);
  },
);

export { authRoutes };
