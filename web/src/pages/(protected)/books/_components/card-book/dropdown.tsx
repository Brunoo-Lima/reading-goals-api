import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  BookImageIcon,
  EditIcon,
  EyeIcon,
  MoreVerticalIcon,
  NotepadTextIcon,
} from 'lucide-react';
import type { IBook } from '@/@types/IBook';
import { AlertDialogDeleteBook } from '../alert-dialog-delete-book';
import React, { useState } from 'react';

const FormAddCoverBook = React.lazy(() =>
  import('../forms/form-add-cover-book').then((module) => ({
    default: module.FormAddCoverBook,
  })),
);

const FormNote = React.lazy(() =>
  import('../forms/form-note').then((module) => ({
    default: module.FormNote,
  })),
);

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
  const [openAddCover, setOpenAddCover] = useState<boolean>(false);

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
        <DropdownMenuContent align="end" className="*:text-xs">
          <DropdownMenuItem onClick={() => onView(book)}>
            <EyeIcon className="h-4 w-4 mr-2" />
            Detalhes
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onEdit(book)}>
            <EditIcon className="h-4 w-4 mr-2" />
            Editar
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpenAddCover(true)}>
            <BookImageIcon className="h-4 w-4 mr-2" />
            Capa do livro
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

      <FormAddCoverBook
        initialData={book || null}
        bookId={book.id}
        open={openAddCover}
        onOpenChange={setOpenAddCover}
      />
    </>
  );
};
