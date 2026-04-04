import type { Request } from 'express';
import type { ICreateBookUseCase } from '../../interfaces/use-cases';
import { created, serverError } from '../helpers';

export class CreateBookController {
  private createBookUseCase: ICreateBookUseCase;
  constructor(createBookUseCase: ICreateBookUseCase) {
    this.createBookUseCase = createBookUseCase;
  }
  async execute(req: Request) {
    try {
      const params = req.body;

      const book = await this.createBookUseCase.execute(params);

      return created(book);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
