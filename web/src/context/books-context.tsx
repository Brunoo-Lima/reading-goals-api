import type { IBook, ICreateBook, StatusReading } from '@/@types/IBook';
import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import type { IReadingGoal } from '@/@types/IGoal';
import { initialGoal } from '@/__mocks__/initial-goals';
import { useCreateBook, useDeleteBook, useUpdateBook } from '@/services/book';
import { toast } from 'sonner';

interface IBooksContext {
  books: IBook[];
  setBooks: Dispatch<SetStateAction<IBook[]>>;

  goal: IReadingGoal;
  completedBooks: IBook[];
  readingBooks: IBook[];
  toReadBooks: IBook[];
  totalPagesRead: number;

  addBook: (book: ICreateBook) => Promise<ICreateBook>;
  updateBook: (id: string, updates: ICreateBook) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  getBooksByStatus: (status: StatusReading) => IBook[];

  updateGoal: (updates: Partial<IReadingGoal>) => void;
}

export const BooksContext = createContext<IBooksContext | undefined>(undefined);

export const BooksProvider = ({ children }: React.PropsWithChildren) => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [goal, setGoal] = useState<IReadingGoal>(initialGoal);

  const createBookService = useCreateBook();
  const deleteBookService = useDeleteBook();
  const updateBookService = useUpdateBook();

  const addBook = async (book: ICreateBook) => {
    const newBook: ICreateBook = {
      ...book,
      start_date: new Date(),
      current_page:
        book.status === 'COMPLETED'
          ? book.total_pages
          : (book.current_page ?? 0),
    };

    const createdBook = await createBookService.mutateAsync(newBook);
    setBooks((prev) => [...prev, createdBook]);

    return createdBook;
  };

  const updateBook = async (id: string, updates: ICreateBook) => {
    await updateBookService.mutateAsync(
      { id, book: updates },
      {
        onSuccess: () => {
          setBooks((prev) =>
            prev.map((book) =>
              book.id === id ? { ...book, ...updates } : book,
            ),
          );
          toast.success('Livro atualizado com sucesso!');
        },
      },
    );
  };

  const deleteBook = async (id: string) => {
    try {
      await deleteBookService.mutateAsync(id, {
        onSuccess: () => {
          setBooks((prev) => prev.filter((book) => book.id !== id));

          setTimeout(() => {
            toast.success('Livro deletado com sucesso!');
          }, 100);
        },
      });
    } catch (e) {
      console.error(e);
      toast.error('Erro ao deletar o livro. Tente novamente.');
    }
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
    if (book.status === 'READING' && book.current_page) {
      return acc + book.current_page;
    }
    return acc;
  }, 0);

  const contextValue = {
    books,
    setBooks,
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
