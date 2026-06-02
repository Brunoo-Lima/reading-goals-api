import { faker } from '@faker-js/faker';
import { note } from '../../../tests';
import type { Request } from 'express';
import { GetNoteByIdController } from '../get-note-by-id';
import { NoteNotFoundError, UserNotFoundError } from '../../../errors';

describe('Get Note By Id Controller', () => {
  class GetNoteByIdUseCaseStub {
    async execute() {
      return note;
    }
  }

  const makeSut = () => {
    const getNoteByIdUseCase = new GetNoteByIdUseCaseStub();

    const sut = new GetNoteByIdController(getNoteByIdUseCase);

    return {
      sut,
      getNoteByIdUseCase,
    };
  };

  const baseHttpRequest = {
    params: {
      noteId: faker.string.uuid(),
      userId: faker.string.uuid(),
    },
  } as Partial<Request> as Request;

  test('should return a note on success', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.execute(baseHttpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual(note);
  });

  test('should return 500 if an error is thrown', async () => {
    const { sut, getNoteByIdUseCase } = makeSut();

    vi.spyOn(getNoteByIdUseCase, 'execute').mockRejectedValueOnce(new Error());

    const httpResponse = await sut.execute(baseHttpRequest);

    expect(httpResponse.statusCode).toBe(500);
  });

  test('should return 400 if note ID is invalid', async () => {
    const { sut } = makeSut();

    const request = {
      params: {
        noteId: 'invalid_id',
        userId: faker.string.uuid(),
      },
    } as Partial<Request> as Request;

    const httpResponse = await sut.execute(request);

    expect(httpResponse.statusCode).toBe(400);
  });

  test('should return 404 if note not found', async () => {
    const { sut, getNoteByIdUseCase } = makeSut();

    vi.spyOn(getNoteByIdUseCase, 'execute').mockImplementationOnce(() => {
      throw new NoteNotFoundError();
    });

    const httpResponse = await sut.execute(baseHttpRequest);

    expect(httpResponse.statusCode).toBe(404);
  });

  test('should return 404 if user not found', async () => {
    const { sut, getNoteByIdUseCase } = makeSut();

    vi.spyOn(getNoteByIdUseCase, 'execute').mockImplementationOnce(() => {
      throw new UserNotFoundError();
    });

    const httpResponse = await sut.execute(baseHttpRequest);

    expect(httpResponse.statusCode).toBe(404);
  });

  test('should return 400 if user ID is invalid', async () => {
    const { sut } = makeSut();

    const request = {
      params: {
        noteId: faker.string.uuid(),
        userId: 'invalid_id',
      },
    } as Partial<Request> as Request;

    const httpResponse = await sut.execute(request);

    expect(httpResponse.statusCode).toBe(400);
  });

  test('should return 500 if GetNoteByIdUseCase throws', async () => {
    const { sut, getNoteByIdUseCase } = makeSut();

    vi.spyOn(getNoteByIdUseCase, 'execute').mockRejectedValueOnce(new Error());

    const httpResponse = await sut.execute(baseHttpRequest);

    expect(httpResponse.statusCode).toBe(500);
  });
});
