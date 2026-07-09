import type { Request } from 'express';
import { note } from '../../../tests';
import { UpdateNoteController } from '../update-note';
import { faker } from '@faker-js/faker';
import {
  BookNotFoundError,
  NoteNotFoundError,
  NotePageNumberExceedsTotalPagesError,
} from '../../../errors';

describe('Update Note Controller', () => {
  class UpdateNoteUseCaseStub {
    async execute() {
      return note;
    }
  }

  const makeSut = () => {
    const updateNoteUseCase = new UpdateNoteUseCaseStub();

    const sut = new UpdateNoteController(updateNoteUseCase);

    return {
      sut,
      updateNoteUseCase,
    };
  };

  const baseHttpRequest = {
    params: {
      userId: faker.string.uuid(),
      noteId: faker.string.uuid(),
    },
    body: {
      content: faker.lorem.sentence(),
      page_number: 300,
    },
  } as Partial<Request> as Request;

  test('should update a note successfully', async () => {
    const { sut } = makeSut();

    const response = await sut.execute(baseHttpRequest);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(note);
  });

  test('should return 400 if page number exceeds total pages', async () => {
    const { sut, updateNoteUseCase } = makeSut();

    vi.spyOn(updateNoteUseCase, 'execute').mockRejectedValueOnce(
      new NotePageNumberExceedsTotalPagesError(),
    );

    const response = await sut.execute(baseHttpRequest);

    expect(response.statusCode).toBe(400);
  });

  test('should return 500 if UpdateNoteUseCase throws', async () => {
    const { sut, updateNoteUseCase } = makeSut();

    vi.spyOn(updateNoteUseCase, 'execute').mockRejectedValueOnce(new Error());

    const response = await sut.execute(baseHttpRequest);

    expect(response.statusCode).toBe(500);
  });

  test('should return 400 if userId is invalid', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      ...baseHttpRequest,
      params: {
        ...baseHttpRequest.params,
        userId: 'invalid-uuid',
      },
    } as Partial<Request> as Request;

    const response = await sut.execute(httpRequest);

    expect(response.statusCode).toBe(400);
  });

  test('should return 400 if noteId is invalid', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      ...baseHttpRequest,
      params: {
        ...baseHttpRequest.params,
        noteId: 'invalid-uuid',
      },
    } as Partial<Request> as Request;

    const response = await sut.execute(httpRequest);

    expect(response.statusCode).toBe(400);
  });

  test('should return 404 if note is not found', async () => {
    const { sut, updateNoteUseCase } = makeSut();

    vi.spyOn(updateNoteUseCase, 'execute').mockRejectedValueOnce(
      new NoteNotFoundError(),
    );

    const response = await sut.execute(baseHttpRequest);

    expect(response.statusCode).toBe(404);
  });

  test('should return 404 if book is not found', async () => {
    const { sut, updateNoteUseCase } = makeSut();

    vi.spyOn(updateNoteUseCase, 'execute').mockRejectedValueOnce(
      new BookNotFoundError(),
    );

    const response = await sut.execute(baseHttpRequest);

    expect(response.statusCode).toBe(404);
  });

  test('should return 400 if body is invalid', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      ...baseHttpRequest,
      body: {
        ...baseHttpRequest.body,
        content: '',
      },
    } as Partial<Request> as Request;

    const response = await sut.execute(httpRequest);

    expect(response.statusCode).toBe(400);
  });
});
