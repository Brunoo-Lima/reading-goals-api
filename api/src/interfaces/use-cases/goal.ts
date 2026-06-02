import type { IGoal, IUpdateGoal } from '../../@types/IGoal';

export interface ICreateGoalUseCase {
  execute(goal: IGoal): Promise<IGoal>;
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
