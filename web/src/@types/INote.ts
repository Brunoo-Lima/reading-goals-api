export interface INote {
  id: string;
  content: string;
  page_number: number;
  created_at: Date;
  updated_at: Date;
}

export type ICreateNote = Omit<INote, 'id' | 'created_at' | 'updated_at'>;
