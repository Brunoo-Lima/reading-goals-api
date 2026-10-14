import type { Request } from 'express';
import type { CoverBookSearchUseCase } from '../../use-cases/book/cover-book-search';
import {
  badRequest,
  externalServiceUnavailable,
  ok,
  serverError,
} from '../helpers';
import { ZodError } from 'zod';
import { CoverProviderUnavailableError } from '../../errors';
import { searchCoversSchema } from '../../schemas';

export class CoverBookSearchController {
  private coverBookSearchUseCase: CoverBookSearchUseCase;

  constructor(coverBookSearchUseCase: CoverBookSearchUseCase) {
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
