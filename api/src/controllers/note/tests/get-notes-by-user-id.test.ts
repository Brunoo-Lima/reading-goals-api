import { faker } from '@faker-js/faker';
import { notes } from '../../../tests';
import { GetNotesByUserIdController } from '../get-notes-by-user-id';
import type { Request } from 'express';
import { BookNotFoundError, UserNotFoundError } from '../../../errors';

describe('Get Notes By User Id Controller', () => {
  class GetNotesByUserIdUseCaseStub {
    async execute() {
      return notes;
    }
  }

  const makeSut = () => {
    const getNotesByUserIdUseCase = new GetNotesByUserIdUseCaseStub();
    const sut = new GetNotesByUserIdController(getNotesByUserIdUseCase);

    return {
      sut,
      getNotesByUserIdUseCase,
    };
  };

  const baseHttpRequest = {
    params: {
      userId: faker.string.uuid(),
    },
    query: {
      bookId: faker.string.uuid(),
    },
  } as Partial<Request> as Request;

  test('should return 200 on success', async () => {
    const { sut } = makeSut();

    const response = await sut.execute(baseHttpRequest);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(notes);
  });

  test('should return 400 if userId is invalid', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      ...baseHttpRequest,
      params: {
        userId: 'invalid-id',
      },
    } as Partial<Request> as Request;

    const response = await sut.execute(httpRequest);

    expect(response.statusCode).toEqual(400);
  });

  test('should return 404 if user is not found', async () => {
    const { sut, getNotesByUserIdUseCase } = makeSut();

    vi.spyOn(getNotesByUserIdUseCase, 'execute').mockRejectedValueOnce(
      new UserNotFoundError(),
    );

    const response = await sut.execute(baseHttpRequest);

    expect(response.statusCode).toEqual(404);
  });

  test('should return 404 if book is not found', async () => {
    const { sut, getNotesByUserIdUseCase } = makeSut();

    vi.spyOn(getNotesByUserIdUseCase, 'execute').mockRejectedValueOnce(
      new BookNotFoundError(),
    );

    const response = await sut.execute(baseHttpRequest);

    expect(response.statusCode).toEqual(404);
  });

  test('should return 500 if use case throws', async () => {
    const { sut, getNotesByUserIdUseCase } = makeSut();

    vi.spyOn(getNotesByUserIdUseCase, 'execute').mockRejectedValueOnce(
      new Error(),
    );

    const response = await sut.execute(baseHttpRequest);

    expect(response.statusCode).toEqual(500);
  });
});
