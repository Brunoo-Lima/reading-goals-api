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

      await this.forgotPasswordUseCase.execute(
        params.email,
        params.securityKey,
      );

      return ok({
        message:
          'Se o e-mail existir e a chave de segurança estiver correta você será redirecionado para a página de redefinição de senha. Aguarde...',
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
