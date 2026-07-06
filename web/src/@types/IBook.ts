export type StatusReading = 'READING' | 'COMPLETED' | 'WISHLIST' | 'ABANDONED';

export interface IBook {
  id: string;
  user_id?: string;
  title: string;
  author: string;
  genre: string[];
  status: StatusReading;
  total_pages: number;
  current_page?: number;
  start_date: Date;
  end_date?: Date;
  created_at: Date;
  updated_at?: Date;
}

export type ICreateBook = Omit<
  IBook,
  'id' | 'updated_at' | 'user_id' | 'created_at'
>;
