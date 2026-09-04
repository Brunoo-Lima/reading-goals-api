import { type Request } from 'express';
import { badRequest, ok, serverError } from '../helpers';
import type { IForgotPasswordUseCase } from '../../interfaces/use-cases';
import { forgotPasswordSchema } from '../../schemas';
import { ZodError } from 'zod';
import { DataInvalidError } from '../../errors';

export class ForgotPasswordController {
  private forgotPasswordUseCase: IForgotPasswordUseCase;

  constructor(forgotPasswordUseCase: IForgotPasswordUseCase) {
    this.forgotPasswordUseCase = forgotPasswordUseCase;
  }

  async execute(request: Request) {
    try {
      const params = request.body;

      await forgotPasswordSchema.parseAsync(params);

      const token = await this.forgotPasswordUseCase.execute(
        params.email,
        params.securityKey,
      );

      return ok({
        token,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest({ message: error.issues[0]?.message });
      }

      if (error instanceof DataInvalidError) {
        return badRequest({ message: error.message });
      }

      return serverError();
    }
  }
}
