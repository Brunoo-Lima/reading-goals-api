export interface IReadingLog {
  id: string;
  book_id: string;
  user_id: string;
  pages_read: number;
  date: string;
  notes_about_session: string | null;
  created_at: string;
  updated_at: string;
}

export interface ICreateReadingLog {
  pages_read: number;
  date: Date;
  notes_about_session?: string;
}
