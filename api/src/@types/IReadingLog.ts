export interface IReadingLog {
  id: string;
  book_id: string;
  user_id: string;
  pages_read: number;
  date: Date;
  notes_about_session: string | null;

  created_at: Date;
  updated_at?: Date;
}
