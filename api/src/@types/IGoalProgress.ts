export interface IGoalProgress {
  id: string;
  value: number;
  note?: string | null;
  logged_at: Date;
  goal_id: string;
}

export type ICreateGoalProgress = {
  id: string;
  goal_id: string;
  value: number;
  note?: string | null;
  logged_at?: Date | string;
};

export type ICreateGoalProgressParams = {
  goal_id: string;
  user_id: string;
  value: number;
  note?: string | null;
  logged_at?: Date | string;
};
