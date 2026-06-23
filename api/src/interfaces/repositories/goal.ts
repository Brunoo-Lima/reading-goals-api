import type { ICreateGoal, IGoal, IUpdateGoal } from '../../@types/IGoal';
import type {
  ICreateGoalProgress,
  IGoalProgress,
} from '../../@types/IGoalProgress';

export interface ICreateGoalRepository {
  execute(goal: ICreateGoal): Promise<IGoal>;
}

export interface IGetGoalsRepository {
  execute(userId: string): Promise<IGoal[] | null>;
}

export interface IGetGoalByIdRepository {
  execute(goalId: string): Promise<IGoal | null>;
}

export interface IUpdateGoalRepository {
  execute(goalId: string, updateGoalParams: IUpdateGoal): Promise<IGoal>;
}

export interface IDeleteGoalRepository {
  execute(goalId: string): Promise<IGoal | null>;
}

export interface ICreateGoalProgressRepository {
  execute(goalProgressParams: ICreateGoalProgress): Promise<{
    goal: IGoal;
    progress: IGoalProgress;
  }>;
}
