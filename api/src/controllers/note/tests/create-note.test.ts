import { faker } from '@faker-js/faker';
import { note } from '../../../tests';
import { CreateNoteController } from '../create-note';
import type { Request } from 'express';
import { BookNotFoundError } from '../../../errors';

describe('Create Note Controller', () => {
  class CreateNoteUseCaseStub {
    async execute() {
      return note;
    }
  }

  const makeSut = () => {
    const createNoteUseCase = new CreateNoteUseCaseStub();
    const sut = new CreateNoteController(createNoteUseCase);

    return {
      sut,
      createNoteUseCase,
    };
  };

  const baseHttpRequest = {
    params: {
      bookId: faker.string.uuid(),
      userId: faker.string.uuid(),
    },
    body: {
      content: faker.lorem.sentence(),
      rating: faker.number.int({ min: 1, max: 5 }),
      page_number: faker.number.int({ min: 1 }),
    },
  } as Partial<Request> as Request;

  test('should return 201 when create a note successfully', async () => {
    const { sut } = makeSut();

    const result = await sut.execute(baseHttpRequest);
    console.log(result);

    expect(result.statusCode).toBe(201);
    expect(result.body).toEqual(note);
  });

  test('should return 400 if bookId is invalid', async () => {
    const { sut } = makeSut();

    const request = {
      params: {
        bookId: 'invalid_id',
        userId: faker.string.uuid(),
      },
      body: {
        ...baseHttpRequest.body,
      },
    } as Partial<Request> as Request;

    const result = await sut.execute(request);

    expect(result.statusCode).toBe(400);
  });

  test('should return 400 if userId is invalid', async () => {
    const { sut } = makeSut();

    const request = {
      params: {
        bookId: faker.string.uuid(),
        userId: 'invalid_id',
      },
      body: {
        ...baseHttpRequest.body,
      },
    } as Partial<Request> as Request;

    const result = await sut.execute(request);

    expect(result.statusCode).toBe(400);
  });

  test('should return 400 if content is invalid', async () => {
    const { sut } = makeSut();

    const request = {
      params: {
        bookId: faker.string.uuid(),
        userId: faker.string.uuid(),
      },
      body: {
        ...baseHttpRequest.body,
        content: ' ',
      },
    } as Partial<Request> as Request;

    const result = await sut.execute(request);

    expect(result.statusCode).toBe(400);
  });

  test('should return 400 if rating is invalid', async () => {
    const { sut } = makeSut();

    const request = {
      params: {
        bookId: faker.string.uuid(),
        userId: faker.string.uuid(),
      },
      body: {
        ...baseHttpRequest.body,
        rating: 6,
      },
    } as Partial<Request> as Request;

    const result = await sut.execute(request);

    expect(result.statusCode).toBe(400);
  });

  test('should return 400 if page number is invalid', async () => {
    const { sut } = makeSut();

    const request = {
      params: {
        bookId: faker.string.uuid(),
        userId: faker.string.uuid(),
      },
      body: {
        ...baseHttpRequest.body,
        page_number: 0,
      },
    } as Partial<Request> as Request;

    const result = await sut.execute(request);

    expect(result.statusCode).toBe(400);
  });

  test('should return 500 if CreateNoteUseCase throws', async () => {
    const { sut, createNoteUseCase } = makeSut();

    vi.spyOn(createNoteUseCase, 'execute').mockRejectedValueOnce(new Error());

    const result = await sut.execute(baseHttpRequest);

    expect(result.statusCode).toBe(500);
  });

  test('should return 404 if book not found', async () => {
    const { sut, createNoteUseCase } = makeSut();

    vi.spyOn(createNoteUseCase, 'execute').mockImplementationOnce(async () => {
      throw new BookNotFoundError();
    });

    const result = await sut.execute(baseHttpRequest);

    expect(result.statusCode).toBe(404);
  });
});
