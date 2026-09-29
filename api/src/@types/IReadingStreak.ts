export interface IReadingStreak {
  currentStreak: number;
  longestStreak: number;
  lastReadingDate: string | null;
  readToday: boolean;
}
