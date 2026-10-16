import type { Response } from 'express';
import { noContent, serverError } from '../helpers';

export class LogOutController {
  async execute(response: Response) {
    try {
      response.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        path: '/',
      });

      response.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        path: '/',
      });

      return noContent();
    } catch (error) {
      console.error('Error during logout:', error);
      return serverError();
    }
  }
}
