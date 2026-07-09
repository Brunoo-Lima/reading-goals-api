import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  EditIcon,
  EyeIcon,
  MoreVerticalIcon,
  NotepadTextIcon,
} from 'lucide-react';
import type { IBook } from '@/@types/IBook';
import { AlertDialogDeleteBook } from '../alert-dialog-delete-book';
import { FormNote } from '../forms/form-note';
import { useState } from 'react';

interface IDropdownProps {
  book: IBook;
  onEdit: (book: IBook) => void;
  onDelete: (book: IBook) => void;
  onView: (book: IBook) => void;
}

export const Dropdown = ({
  book,
  onEdit,
  onDelete,
  onView,
}: IDropdownProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVerticalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onView(book)}>
            <EyeIcon className="h-4 w-4 mr-2" />
            Detalhes
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onEdit(book)}>
            <EditIcon className="h-4 w-4 mr-2" />
            Editar
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <NotepadTextIcon className="h-4 w-4 mr-2" />
            Adicionar nota
          </DropdownMenuItem>

          <AlertDialogDeleteBook book={book} onDelete={onDelete} />
        </DropdownMenuContent>
      </DropdownMenu>

      <FormNote
        initialData={null}
        bookId={book.id}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
};
