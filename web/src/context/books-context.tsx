import type { IBook, StatusReading } from '@/@types/IBook';
import type { IStreak } from '@/@types/IStreak';
import { createContext, useState } from 'react';
import { initialBooks } from '../../__mocks__/initial-books';

interface IBooksContext {
  streak: IStreak;
  setStreak: (streak: IStreak) => void;

  books: IBook[];
  addBook: (book: Omit<IBook, 'id' | 'created_at'>) => IBook;
  updateBook: (id: string, updates: Partial<IBook>) => void;
  deleteBook: (id: string) => void;
  getBooksByStatus: (status: StatusReading) => IBook[];
}

export const BooksContext = createContext<IBooksContext | undefined>(undefined);

export const BooksProvider = ({ children }: React.PropsWithChildren) => {
  const [books, setBooks] = useState<IBook[]>(initialBooks);
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

  // const updateGoal = (updates: Partial<ReadingGoal>) => {
  //   setGoal((prev) => ({ ...prev, ...updates }));
  // };

  const getBooksByStatus = (status: StatusReading) => {
    return books.filter((book) => book.status === status);
  };

  const contextValue = {
    streak,
    setStreak,

    books,
    addBook,
    updateBook,
    deleteBook,
    getBooksByStatus,
  };

  return (
    <BooksContext.Provider value={contextValue}>
      {children}
    </BooksContext.Provider>
  );
};
