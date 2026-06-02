export interface INote {
  id: string;
  content: string;
  rating?: number | null;
  page_number?: number | null;
  book_id: string;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export type IUpdateNote = Omit<INote, 'id' | 'created_at'>;
