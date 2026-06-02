import type { Request } from 'express';
import { note } from '../../../tests';
import { DeleteNoteController } from '../delete-note';
import { faker } from '@faker-js/faker';
import { NoteNotFoundError } from '../../../errors';

describe('Delete Note Controller', () => {
  class DeleteNoteUseCaseStub {
    async execute() {
      return note;
    }
  }

  const makeSut = () => {
    const deleteNoteUseCase = new DeleteNoteUseCaseStub();
    const sut = new DeleteNoteController(deleteNoteUseCase);

    return {
      sut,
      deleteNoteUseCase,
    };
  };

  const baseHttpRequest = {
    params: {
      userId: faker.string.uuid(),
      noteId: faker.string.uuid(),
    },
  } as Partial<Request> as Request;

  test('should return 200 on success', async () => {
    const { sut } = makeSut();

    const response = await sut.execute(baseHttpRequest);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(note);
  });

  test('should return 404 if userId is invalid', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      ...baseHttpRequest,
      params: {
        ...baseHttpRequest.params,
        userId: 'invalid_user_id',
      },
    } as Partial<Request> as Request;

    const response = await sut.execute(httpRequest);

    expect(response.statusCode).toBe(404);
  });

  test('should return 404 if noteId is invalid', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      ...baseHttpRequest,
      params: {
        ...baseHttpRequest.params,
        noteId: 'invalid_note_id',
      },
    } as Partial<Request> as Request;

    const response = await sut.execute(httpRequest);

    expect(response.statusCode).toBe(404);
  });

  test('should return 404 if note is not found', async () => {
    const { sut, deleteNoteUseCase } = makeSut();

    vi.spyOn(deleteNoteUseCase, 'execute').mockRejectedValueOnce(
      new NoteNotFoundError(),
    );

    const response = await sut.execute(baseHttpRequest);

    expect(response.statusCode).toBe(404);
  });

  test('should return 500 if deleteNoteUseCase throws', async () => {
    const { sut, deleteNoteUseCase } = makeSut();

    vi.spyOn(deleteNoteUseCase, 'execute').mockRejectedValueOnce(new Error());

    const response = await sut.execute(baseHttpRequest);

    expect(response.statusCode).toBe(500);
  });
});
