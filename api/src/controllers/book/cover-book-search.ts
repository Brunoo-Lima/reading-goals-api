import type { Request } from 'express';
import {
  badRequest,
  externalServiceUnavailable,
  ok,
  serverError,
} from '../helpers';
import { ZodError } from 'zod';
import { CoverProviderUnavailableError } from '../../errors';
import { searchCoversSchema } from '../../schemas';
import type { ICoverBookSearchUseCase } from '../../interfaces/use-cases';

export class CoverBookSearchController {
  private coverBookSearchUseCase: ICoverBookSearchUseCase;

  constructor(coverBookSearchUseCase: ICoverBookSearchUseCase) {
    this.coverBookSearchUseCase = coverBookSearchUseCase;
  }

  async execute(req: Request) {
    try {
      const { title } = await searchCoversSchema.parseAsync(req.query);

      const covers = await this.coverBookSearchUseCase.execute(title);

      return ok(covers);
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest({ message: error.issues[0]?.message });
      }

      if (error instanceof CoverProviderUnavailableError) {
        return externalServiceUnavailable();
      }

      return serverError();
    }
  }
}
