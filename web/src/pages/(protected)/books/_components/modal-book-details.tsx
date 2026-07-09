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
import { FormNote } from './forms/form-note';
import { useState } from 'react';
import { useNotes } from '@/hooks/use-notes';
import { DetailBook } from './modal-book-details/tabs/detail-book';
import { Notes } from './modal-book-details/tabs/notes';

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
  const { note, notes, setNote } = useNotes();

  if (!book) return null;

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
              <DetailBook book={book} note={note} />
            </TabsContent>

            <TabsContent value="notes" className="mt-4">
              {notes.length > 0 ? (
                <Notes
                  note={note}
                  setShowFormNote={setShowFormNote}
                  setNote={setNote}
                />
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
    </>
  );
}
