export type GoalsType = 'DAILY_PAGES' | 'DAILY_READING_TIME';

export interface IGoal {
  id: string;
  user_id: string;
  type: GoalsType;
  target_value: number;
  start_date: Date;
  end_date: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface IReadingGoal {
  id: string;
  year: number;
  targetBooks: number;
  completedBooks: number;
}
