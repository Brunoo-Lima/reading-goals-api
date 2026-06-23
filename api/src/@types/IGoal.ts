import type { GoalsType } from '../../generated/prisma/enums';

export interface IGoal {
  id: string;
  user_id: string;
  book_id: string | null;
  type: GoalsType;
  target_value: number;
  current_value: number;
  start_date: Date;
  end_date: Date | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export type ICreateGoal = Omit<
  IGoal,
  'created_at' | 'updated_at' | 'current_value' | 'is_active' | 'book_id'
> & {
  book_id?: string | null;
  current_value?: number;
  is_active?: boolean;
  start_date?: Date | string;
  end_date?: Date | string | null;
};

export type ICreateGoalParams = Omit<ICreateGoal, 'id'>;

export type IUpdateGoal = Partial<Omit<ICreateGoal, 'id' | 'user_id'>> & {
  user_id: string;
};
