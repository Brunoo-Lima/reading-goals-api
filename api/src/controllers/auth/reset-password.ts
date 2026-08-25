import { ZodError } from 'zod';
import { InvalidTokenError, UserNotFoundError } from '../../errors';
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
  userNotFoundResponse,
} from '../helpers';
import { resetPasswordSchema } from '../../schemas';
import type { IResetPasswordUseCase } from '../../interfaces/use-cases';
import type { Request } from 'express';

export class ResetPasswordController {
  private resetPasswordUseCase: IResetPasswordUseCase;

  constructor(resetPasswordUseCase: IResetPasswordUseCase) {
    this.resetPasswordUseCase = resetPasswordUseCase;
  }

  async execute(request: Request) {
    try {
      const params = request.body;

      await resetPasswordSchema.parseAsync(params);

      await this.resetPasswordUseCase.execute(params.token, params.newPassword);

      return ok({ message: 'Password reset successful' });
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest({ message: error.issues[0]?.message });
      }

      if (error instanceof InvalidTokenError) {
        return unauthorized();
      }

      if (error instanceof UserNotFoundError) {
        return userNotFoundResponse();
      }

      return serverError();
    }
  }
}
