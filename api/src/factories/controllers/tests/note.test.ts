import {
  CreateNoteController,
  GetNotesByUserIdController,
} from '../../../controllers';
import {
  makeCreateNoteController,
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
});
