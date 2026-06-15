import type { IBook, StatusReading } from '@/@types/IBook';
import type { IStreak } from '@/@types/IStreak';
import { createContext, useState } from 'react';
import { initialBooks } from '../__mocks__/initial-books';
import type { IReadingGoal } from '@/@types/IGoal';
import { initialGoal } from '@/__mocks__/initial-goals';

interface IBooksContext {
  streak: IStreak;
  setStreak: (streak: IStreak) => void;

  books: IBook[];

  goal: IReadingGoal;
  completedBooks: IBook[];
  readingBooks: IBook[];
  toReadBooks: IBook[];
  totalPagesRead: number;

  addBook: (book: Omit<IBook, 'id' | 'created_at'>) => IBook;
  updateBook: (id: string, updates: Partial<IBook>) => void;
  deleteBook: (id: string) => void;
  getBooksByStatus: (status: StatusReading) => IBook[];

  updateGoal: (updates: Partial<IReadingGoal>) => void;
}

export const BooksContext = createContext<IBooksContext | undefined>(undefined);

export const BooksProvider = ({ children }: React.PropsWithChildren) => {
  const [books, setBooks] = useState<IBook[]>(initialBooks);
  const [goal, setGoal] = useState<IReadingGoal>(initialGoal);

  const [streak, setStreak] = useState<IStreak>({
    currentStreak: 0,
    lastReadDate: null,
    longestStreak: 0,
  });

  const addBook = (book: Omit<IBook, 'id' | 'created_at'>) => {
    const newBook: IBook = {
      ...book,
      id: Date.now().toString(),
      created_at: new Date().toISOString().split('T')[0],
    };
    setBooks((prev) => [...prev, newBook]);
    return newBook;
  };

  const updateBook = (id: string, updates: Partial<IBook>) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? { ...book, ...updates } : book)),
    );
  };

  const deleteBook = (id: string) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const updateGoal = (updates: Partial<IReadingGoal>) => {
    setGoal((prev) => ({ ...prev, ...updates }));
  };

  const getBooksByStatus = (status: StatusReading) => {
    return books.filter((book) => book.status === status);
  };

  const completedBooks = books.filter((book) => book.status === 'COMPLETED');
  const readingBooks = books.filter((book) => book.status === 'READING');
  const toReadBooks = books.filter((book) => book.status === 'WISHLIST');

  const totalPagesRead = books.reduce((acc, book) => {
    if (book.status === 'COMPLETED' && book.total_pages) {
      return acc + book.total_pages;
    }
    if (book.status === 'READING' && book.currentPage) {
      return acc + book.currentPage;
    }
    return acc;
  }, 0);

  const contextValue = {
    streak,
    setStreak,

    books,
    goal,
    totalPagesRead,

    addBook,
    updateBook,
    deleteBook,
    getBooksByStatus,

    completedBooks,
    readingBooks,
    toReadBooks,
    updateGoal,
  };

  return (
    <BooksContext.Provider value={contextValue}>
      {children}
    </BooksContext.Provider>
  );
};
