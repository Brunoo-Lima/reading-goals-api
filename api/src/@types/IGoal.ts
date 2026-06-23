import type { GoalsType } from '../../generated/prisma/enums';

export interface IGoal {
  id: string;
  user_id: string;
  book_id?: string;
  type: GoalsType;
  target_value: number;
  current_value: number;
  start_date: Date;
  end_date: Date | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export type IUpdateGoal = Omit<IGoal, 'id' | 'created_at'>;
