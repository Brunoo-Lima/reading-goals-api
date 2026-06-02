import {
  CreateGoalController,
  GetGoalByIdController,
  GetGoalsController,
  UpdateGoalController,
} from '../../../controllers';
import { DeleteGoalController } from '../../../controllers/goal/delete-goal';
import {
  makeCreateGoalController,
  makeDeleteGoalController,
  makeGetGoalByIdController,
  makeGetGoalsController,
  makeUpdateGoalController,
} from '../goal';

describe('Factory Goal Controller', () => {
  test('should return a CreateGoalController', () => {
    const createGoalController = makeCreateGoalController();
    expect(createGoalController).toBeInstanceOf(CreateGoalController);
  });

  test('should return a GetGoalsController', () => {
    const getGoalsController = makeGetGoalsController();
    expect(getGoalsController).toBeInstanceOf(GetGoalsController);
  });

  test('should return a GetGoalByIdController', () => {
    const getGoalByIdController = makeGetGoalByIdController();
    expect(getGoalByIdController).toBeInstanceOf(GetGoalByIdController);
  });

  test('should return a UpdateGoalController', () => {
    const updateGoalController = makeUpdateGoalController();
    expect(updateGoalController).toBeInstanceOf(UpdateGoalController);
  });

  test('should return a DeleteGoalController', () => {
    const deleteGoalController = makeDeleteGoalController();
    expect(deleteGoalController).toBeInstanceOf(DeleteGoalController);
  });
});
