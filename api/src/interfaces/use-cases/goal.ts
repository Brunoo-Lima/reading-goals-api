import type { ICreateGoalParams, IGoal, IUpdateGoal } from '../../@types/IGoal';
import type {
  ICreateGoalProgressParams,
  IGoalProgress,
} from '../../@types/IGoalProgress';

export interface ICreateGoalUseCase {
  execute(goal: ICreateGoalParams): Promise<IGoal>;
}

export interface IGetGoalsUseCase {
  execute(userId: string): Promise<IGoal[] | null>;
}

export interface IGetGoalByIdUseCase {
  execute(goalId: string, userId: string): Promise<IGoal | null>;
}

export interface IUpdateGoalUseCase {
  execute(goalId: string, updateGoalParams: IUpdateGoal): Promise<IGoal>;
}

export interface IDeleteGoalUseCase {
  execute(goalId: string): Promise<IGoal | null>;
}

export interface ICreateGoalProgressUseCase {
  execute(goalProgressParams: ICreateGoalProgressParams): Promise<{
    goal: IGoal;
    progress: IGoalProgress;
  }>;
}
