import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import type { ICreateNote, INote } from '@/@types/INote';
import { useCreateNote, useDeleteNote, useUpdateNote } from '@/services/notes';
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
  deleteNote: (id: string) => Promise<void>;
  // getBooksByStatus: (status: StatusReading) => IBook[];
}

export const NotesContext = createContext<INotesContext | undefined>(undefined);

export const NotesProvider = ({ children }: React.PropsWithChildren) => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [note, setNote] = useState<INote | null>(null);

  const createNoteService = useCreateNote();
  const updateNoteService = useUpdateNote();
  const deleteBookService = useDeleteNote();

  const addNote = async (note: ICreateNote, bookId: string) => {
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

  const deleteNote = async (id: string) => {
    try {
      await deleteBookService.mutateAsync(id, {
        onSuccess: () => {
          setNotes((prev) => prev.filter((note) => note.id !== id));

          setTimeout(() => {
            toast.success('Nota deletado com sucesso!');
          }, 100);
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const contextValue = {
    notes,
    setNotes,
    note,
    setNote,
    addNote,
    updateNote,
    deleteNote,
  };

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
};
