import type { Response } from 'express';
import { noContent, serverError } from '../helpers';

export class LogOutController {
  async execute(response: Response) {
    try {
      const isProduction = process.env.NODE_ENV === 'production';

      response.clearCookie('accessToken', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        path: '/',
      });

      response.clearCookie('refreshToken', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        path: '/',
      });

      return noContent();
    } catch (error) {
      console.error('Error during logout:', error);
      return serverError();
    }
  }
}
