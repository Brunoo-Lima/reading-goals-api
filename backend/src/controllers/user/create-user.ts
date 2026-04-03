import type { Request } from 'express';
import type { ICreateUserUseCase } from '../../interfaces/use-cases/user';
import { badRequest, created, serverError } from '../helpers';
import { EmailAlreadyInUseError } from '../../errors';

export class CreateUserController {
  private createUserUseCase: ICreateUserUseCase;
  constructor(createUserUseCase: ICreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async execute(req: Request) {
    try {
      const params = req.body;

      const user = await this.createUserUseCase.execute(params);

      return created(user);
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({ message: error.message });
      }

      console.error(error);
      return serverError();
    }
  }
}
