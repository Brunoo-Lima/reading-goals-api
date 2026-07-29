import type { Request, Response } from 'express';
import type { ILoginUseCase } from '../../interfaces/use-cases';
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
  userNotFoundResponse,
} from '../helpers';
import { loginSchema } from '../../schemas';
import { ZodError } from 'zod';
import { InvalidPasswordError, UserNotFoundError } from '../../errors';

export class LoginController {
  private loginUseCase: ILoginUseCase;

  constructor(loginUseCase: ILoginUseCase) {
    this.loginUseCase = loginUseCase;
  }

  async execute(request: Request, response: Response) {
    try {
      const { email, password, rememberMe } = request.body;

      await loginSchema.parseAsync({ email, password, rememberMe });

      const result = await this.loginUseCase.execute(
        email,
        password,
        rememberMe,
      );

      const { tokens, ...user } = result;

      response.cookie('accessToken', tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 15 * 60 * 1000,
        path: '/',
      });

      if (tokens.refreshToken) {
        response.cookie('refreshToken', tokens.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 30 * 24 * 60 * 60 * 1000,
          path: '/api/v1/auth/refresh-token', // opcional: restringe o cookie só à rota de refresh
        });
      }

      return ok(user);
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest({ message: error.issues[0]?.message });
      }

      if (error instanceof InvalidPasswordError) {
        return unauthorized();
      }

      if (error instanceof UserNotFoundError) {
        return userNotFoundResponse();
      }

      return serverError();
    }
  }
}
