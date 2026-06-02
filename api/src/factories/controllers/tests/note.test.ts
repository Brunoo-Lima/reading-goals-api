import {
  CreateNoteController,
  GetNoteByIdController,
  GetNotesByUserIdController,
} from '../../../controllers';
import {
  makeCreateNoteController,
  makeGetNoteByIdController,
  makeGetNotesByUserIdController,
} from '../note';

describe('Factory Note Controller', () => {
  test('should return a CreateNoteController', () => {
    const createNoteController = makeCreateNoteController();
    expect(createNoteController).toBeInstanceOf(CreateNoteController);
  });

  test('should return a GetNotesByUserIdController', () => {
    const getNotesByUserIdController = makeGetNotesByUserIdController();
    expect(getNotesByUserIdController).toBeInstanceOf(
      GetNotesByUserIdController,
    );
  });

  test('should return a GetNoteByIdController', () => {
    const getNoteByIdController = makeGetNoteByIdController();
    expect(getNoteByIdController).toBeInstanceOf(GetNoteByIdController);
  });
});
