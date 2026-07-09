import type { IBook } from '@/@types/IBook';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FileTextIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FormNote } from '../forms/form-note';
import { useEffect, useState } from 'react';
import { useNotes } from '@/hooks/use-notes';
import { DetailBook } from './tabs/detail-book';
import { Notes } from './tabs/notes';
import { getNotesByBookId } from '@/services/notes';
import { AlertDialogDeleteNote } from '../alert-dialog-delete-note';

interface IModalBookDetailsProps {
  book: IBook | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ModalBookDetails({
  book,
  open,
  onOpenChange,
}: IModalBookDetailsProps) {
  const [showFormNote, setShowFormNote] = useState<boolean>(false);
  const [showDeleteNote, setShowDeleteNote] = useState<boolean>(false);
  const { note, notes, setNote, setNotes, deleteNote } = useNotes();

  useEffect(() => {
    const fetchNotesByBookId = async () => {
      if (book && book.id) {
        const notes = await getNotesByBookId(book.id);
        setNotes(notes);
      }
    };

    fetchNotesByBookId();
  }, [book, setNotes]);

  const handleDeleteNote = (id: string) => {
    deleteNote(id);
    setShowDeleteNote(false);
  };

  if (!book) return;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl pr-8">{book.title}</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="notes">Notas</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 mt-4">
              <DetailBook book={book} />
            </TabsContent>

            <TabsContent value="notes" className="mt-4 space-y-4">
              {notes.length > 0 ? (
                <div className="flex flex-col gap-4 h-[300px] overflow-y-auto pr-2 ">
                  {notes.map((note) => (
                    <Notes
                      key={note.id}
                      note={note}
                      setNote={setNote}
                      setShowFormNote={setShowFormNote}
                      setShowDeleteNote={setShowDeleteNote}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 py-8">
                  <FileTextIcon className="size-8 text-muted-foreground" />
                  <p className="text-lg font-medium">Nenhuma nota cadastrada</p>
                  <p className="text-muted-foreground text-center">
                    Clique no botão "Adicionar Nota" para cadastrar uma nota
                    para este livro.
                  </p>

                  <Button
                    variant="default"
                    className="w-48 cursor-pointer"
                    onClick={() => setShowFormNote(true)}
                  >
                    Adicionar Nota
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={() => onOpenChange(false)}
          >
            Fechar
          </Button>
        </DialogContent>
      </Dialog>

      <FormNote
        bookId={book.id}
        open={showFormNote}
        initialData={note ?? null}
        onOpenChange={setShowFormNote}
      />

      {showDeleteNote && (
        <AlertDialogDeleteNote
          open={showDeleteNote}
          onOpenChange={setShowDeleteNote}
          onDelete={() => handleDeleteNote(note?.id ?? '')}
        />
      )}
    </>
  );
}
