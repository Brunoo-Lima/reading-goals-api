export interface IBook {
  id: string;
  user_id: string;
  title: string;
  author: string;
  genre: string[];
  status: StatusReading;
  total_pages: number;
  start_date: Date;
  end_date: Date;

  created_at: Date;
  updated_at?: Date;
}

enum StatusReading {
  WISHLIST = 'WISHLIST',
  READING = 'READING',
  COMPLETED = 'COMPLETED',
  ABANDONED = 'ABANDONED',
}
