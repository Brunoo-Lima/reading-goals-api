import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

import { EditIcon, EyeIcon, MoreVerticalIcon, Trash2Icon } from 'lucide-react';
import type { IBook } from '@/@types/IBook';

interface IDropdownProps {
  book: IBook;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (book: IBook) => void;
}

export const Dropdown = ({
  book,
  onEdit,
  onDelete,
  onView,
}: IDropdownProps) => {
  return (
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
        <DropdownMenuItem onClick={() => onEdit(book.id)}>
          <EditIcon className="h-4 w-4 mr-2" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onDelete(book.id)}
          className="text-destructive"
        >
          <Trash2Icon className="h-4 w-4 mr-2" />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
