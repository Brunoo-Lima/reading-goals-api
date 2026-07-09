import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import type { ICreateNote, INote } from '@/@types/INote';
import { useCreateNote, useUpdateNote } from '@/services/notes';
import { toast } from 'sonner';

interface INotesContext {
  notes: INote[];
  setNotes: Dispatch<SetStateAction<INote[]>>;

  note: INote | null;
  setNote: Dispatch<SetStateAction<INote | null>>;

  addNote: (note: ICreateNote, bookId: string) => Promise<ICreateNote>;
  updateNote: (
    id: string,
    updates: ICreateNote,
    bookId: string,
  ) => Promise<void>;
  // deleteBook: (id: string) => Promise<void>;
  // getBooksByStatus: (status: StatusReading) => IBook[];
}

export const NotesContext = createContext<INotesContext | undefined>(undefined);

export const NotesProvider = ({ children }: React.PropsWithChildren) => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [note, setNote] = useState<INote | null>(null);

  const createNoteService = useCreateNote();
  const updateNoteService = useUpdateNote();

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

  const updateNote = async (
    noteId: string,
    updates: ICreateNote,
    bookId: string,
  ) => {
    await updateNoteService.mutateAsync(
      { noteId, note: updates, bookId },
      {
        onSuccess: () => {
          setNotes((prev) =>
            prev.map((note) =>
              note.id === noteId ? { ...note, ...updates } : note,
            ),
          );
          toast.success('Nota atualizada com sucesso!');
        },
      },
    );
  };

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
    setNotes,
    note,
    setNote,
    addNote,
    updateNote,
  };

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
};
