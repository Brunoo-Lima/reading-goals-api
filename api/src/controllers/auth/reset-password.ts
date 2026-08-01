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

export class ResetPasswordController {
  private resetPasswordUseCase: IResetPasswordUseCase;

  constructor(resetPasswordUseCase: IResetPasswordUseCase) {
    this.resetPasswordUseCase = resetPasswordUseCase;
  }

  async execute(request: Request) {
    try {
      const { token, newPassword } = request.body;

      await resetPasswordSchema.parseAsync({ token, newPassword });

      await this.resetPasswordUseCase.execute(token, newPassword);

      return ok({ message: 'Password reset successful' });
    } catch (error) {
      console.log(error);

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
