export type GoalsType =
  | 'DAILY_PAGES'
  | 'BOOKS_PER_MONTH'
  | 'BOOKS_PER_YEAR'
  | 'TOTAL_PAGES'
  | 'SPECIFIC_BOOK';

export interface IGoal {
  id: string;
  user_id: string;
  book_id?: string | null;
  type: GoalsType;
  target_value: number;
  current_value?: number;
  start_date: Date;
  end_date?: Date;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export type ICreateGoal = Omit<
  IGoal,
  'id' | 'created_at' | 'user_id' | 'updated_at' | 'is_active'
>;

export interface IReadingGoal {
  id: string;
  year: number;
  targetBooks: number;
  completedBooks: number;
}

export const GOAL_TYPES = [
  'DAILY_PAGES',
  'BOOKS_PER_MONTH',
  'BOOKS_PER_YEAR',
  'TOTAL_PAGES',
  'SPECIFIC_BOOK',
];

export const GOAL_TYPE_LABELS: Record<GoalsType, string> = {
  DAILY_PAGES: 'Páginas por dia',
  BOOKS_PER_MONTH: 'Livros por mês',
  BOOKS_PER_YEAR: 'Livros por ano',
  TOTAL_PAGES: 'Total de páginas',
  SPECIFIC_BOOK: 'Livro específico',
};

export const GOAL_TYPE_UNITS: Record<GoalsType, string> = {
  DAILY_PAGES: 'páginas/dia',
  BOOKS_PER_MONTH: 'livros/mês',
  BOOKS_PER_YEAR: 'livros/ano',
  TOTAL_PAGES: 'páginas',
  SPECIFIC_BOOK: 'páginas',
};
