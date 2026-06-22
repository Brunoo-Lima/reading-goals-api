import {
  CreateNoteController,
  DeleteNoteController,
  GetNoteByIdController,
  GetNotesByBookIdController,
  UpdateNoteController,
} from '../../../controllers';
import {
  makeCreateNoteController,
  makeDeleteNoteController,
  makeGetNoteByIdController,
  makeGetNotesByBookIdController,
  makeUpdateNoteController,
} from '../note';

describe('Factory Note Controller', () => {
  test('should return a CreateNoteController', () => {
    const createNoteController = makeCreateNoteController();
    expect(createNoteController).toBeInstanceOf(CreateNoteController);
  });

  test('should return a GetNotesByBookIdController', () => {
    const getNotesByBookIdController = makeGetNotesByBookIdController();
    expect(getNotesByBookIdController).toBeInstanceOf(
      GetNotesByBookIdController,
    );
  });

  test('should return a GetNoteByIdController', () => {
    const getNoteByIdController = makeGetNoteByIdController();
    expect(getNoteByIdController).toBeInstanceOf(GetNoteByIdController);
  });

  test('should return a UpdateNoteController', () => {
    const updateNoteController = makeUpdateNoteController();
    expect(updateNoteController).toBeInstanceOf(UpdateNoteController);
  });

  test('should return a DeleteNoteController', () => {
    const deleteNoteController = makeDeleteNoteController();
    expect(deleteNoteController).toBeInstanceOf(DeleteNoteController);
  });
});
