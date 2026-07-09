import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import type { ICreateNote, INote } from '@/@types/INote';
import { useCreateNote } from '@/services/notes';

interface INotesContext {
  notes: INote[];
  // setNotes: Dispatch<SetStateAction<INote[]>>;

  note: INote | null;
  setNote: Dispatch<SetStateAction<INote | null>>;

  addNote: (note: ICreateNote, bookId: string) => Promise<ICreateNote>;
  // updateBook: (id: string, updates: ICreateBook) => Promise<void>;
  // deleteBook: (id: string) => Promise<void>;
  // getBooksByStatus: (status: StatusReading) => IBook[];
}

export const NotesContext = createContext<INotesContext | undefined>(undefined);

export const NotesProvider = ({ children }: React.PropsWithChildren) => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [note, setNote] = useState<INote | null>(null);

  const createNoteService = useCreateNote();

  const addNote = async (note: ICreateNote, bookId: string) => {
    // const newNote: ICreateNote = {
    //   ...note,
    //   book_id: bookId,
    // };

    const createdNote = await createNoteService.mutateAsync({
      note,
      bookId,
    });
    setNotes((prev) => [...prev, createdNote]);

    return createdNote;
  };

  // const updateBook = async (id: string, updates: ICreateBook) => {
  //         : (book.current_page ?? 0),
  //   };

  //   const createdBook = await createBookService.mutateAsync(newBook);
  //   setBooks((prev) => [...prev, createdBook]);

  //   return createdBook;
  // };

  // const updateBook = async (id: string, updates: ICreateBook) => {
  //   await updateBookService.mutateAsync(
  //     { id, book: updates },
  //     {
  //       onSuccess: () => {
  //         setBooks((prev) =>
  //           prev.map((book) =>
  //             book.id === id ? { ...book, ...updates } : book,
  //           ),
  //         );
  //         toast.success('Livro atualizado com sucesso!');
  //       },
  //     },
  //   );
  // };

  // const deleteBook = async (id: string) => {
  //   try {
  //     await deleteBookService.mutateAsync(id, {
  //       onSuccess: () => {
  //         setBooks((prev) => prev.filter((book) => book.id !== id));

  //         setTimeout(() => {
  //           toast.success('Livro deletado com sucesso!');
  //         }, 100);
  //       },
  //     });
  //   } catch (e) {
  //     console.error(e);
  //     toast.error('Erro ao deletar o livro. Tente novamente.');
  //   }
  // };

  const contextValue = {
    notes,
    note,
    setNote,
    addNote,
  };

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
};
