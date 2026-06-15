import type { IBook, StatusReading } from '@/@types/IBook';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  BookOpenIcon,
  EditIcon,
  EyeIcon,
  MoreVerticalIcon,
  StarIcon,
  Trash2Icon,
} from 'lucide-react';

interface IBookCardProps {
  book: IBook;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (book: IBook) => void;
}

export const BookCard = ({
  book,
  onEdit,
  onDelete,
  onView,
}: IBookCardProps) => {
  // const progress =
  //   book.currentPage && book.totalPages
  //     ? Math.round((book.currentPage / book.totalPages) * 100)
  //     : 0;

  const currentPage = 100;
  const progress = book.total_pages
    ? Math.round((currentPage / book.total_pages) * 100)
    : 0;
  const rating = Math.round(Math.random() * 5);

  const statusLabels: Record<StatusReading, string> = {
    WISHLIST: 'Quero Ler',
    READING: 'Lendo',
    COMPLETED: 'Concluído',
    ABANDONED: 'Abandonado',
  };

  const statusColors: Record<StatusReading, string> = {
    WISHLIST: 'bg-secondary text-secondary-foreground',
    READING: 'bg-accent text-accent-foreground',
    COMPLETED: 'bg-primary text-primary-foreground',
    ABANDONED: 'bg-destructive text-destructive-foreground',
  };

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card hover:shadow-lg transition-all duration-300">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground leading-tight line-clamp-2 text-balance">
              {book.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{book.author}</p>
          </div>
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
                Ver detalhes
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
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[book.status]}`}
          >
            {statusLabels[book.status]}
          </span>
        </div>

        {book.status === 'READING' && book.total_pages && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
              <span>Progresso</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              {/* Página {book.currentPage} de {book.totalPages} */}
              Página {currentPage} de {book.total_pages}
            </p>
          </div>
        )}

        {book.status === 'COMPLETED' && rating && (
          <div className="mt-4 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i < rating! ? 'fill-accent text-accent' : 'text-border'
                }`}
              />
            ))}
          </div>
        )}

        {book.total_pages && book.status === 'WISHLIST' && (
          <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
            <BookOpenIcon className="h-3.5 w-3.5" />
            <span>{book.total_pages} páginas</span>
          </div>
        )}
      </div>
    </Card>
  );
};
