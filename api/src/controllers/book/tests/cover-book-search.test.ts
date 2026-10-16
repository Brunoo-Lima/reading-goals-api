import { faker } from '@faker-js/faker';
import type { Request } from 'express';
import { CoverProviderUnavailableError } from '../../../errors';
import { CoverBookSearchController } from '../cover-book-search';

describe('Cover Book Search Controller', () => {
  class CoverBookSearchUseCaseStub {
    async execute() {
      return [{ cover_id: faker.number.int() }];
    }
  }

  const makeSut = () => {
    const coverBookSearchUseCase = new CoverBookSearchUseCaseStub();

    const sut = new CoverBookSearchController(coverBookSearchUseCase);

    return { sut, coverBookSearchUseCase };
  };

  const baseHttpRequest = {
    query: { title: 'Dune' },
  } as Partial<Request> as Request;

  test('should search book covers successfully', async () => {
    const { sut } = makeSut();

    const result = await sut.execute(baseHttpRequest);

    expect(result.statusCode).toBe(200);
  });

  test('should return 400 if title is invalid', async () => {
    const { sut } = makeSut();

    const result = await sut.execute({
      query: {},
    } as Partial<Request> as Request);

    expect(result.statusCode).toBe(400);
  });

  test('should return 502 if cover provider is unavailable', async () => {
    const { sut, coverBookSearchUseCase } = makeSut();

    vi.spyOn(coverBookSearchUseCase, 'execute').mockRejectedValueOnce(
      new CoverProviderUnavailableError(),
    );

    const result = await sut.execute(baseHttpRequest);

    expect(result.statusCode).toBe(502);
  });

  test('should return 500 if CoverBookSearchUseCase throws', async () => {
    const { sut, coverBookSearchUseCase } = makeSut();

    vi.spyOn(coverBookSearchUseCase, 'execute').mockRejectedValueOnce(
      new Error(),
    );

    const result = await sut.execute(baseHttpRequest);

    expect(result.statusCode).toBe(500);
  });
});
