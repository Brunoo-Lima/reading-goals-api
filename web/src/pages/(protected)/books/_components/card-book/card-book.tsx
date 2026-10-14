import type { IBook } from '@/@types/IBook';
import { Card } from '@/components/ui/card';
import { BookOpenIcon, BookOpenTextIcon, StarIcon } from 'lucide-react';
import { Dropdown } from './dropdown';
import { statusColors, statusLabels } from '@/utils/status-labels';
import { useState } from 'react';

interface ICardBookProps {
  book: IBook;
  onEdit: (book: IBook) => void;
  onDelete: (book: IBook) => void;
  onView: (book: IBook) => void;
}

export const CardBook = ({
  book,
  onEdit,
  onDelete,
  onView,
}: ICardBookProps) => {
  const currentPage = book.current_page ?? 0;
  const [coverUnavailable, setCoverUnavailable] = useState(false);

  const progress =
    currentPage && book.total_pages
      ? Math.round((currentPage / book.total_pages) * 100)
      : 0;
  const rating = book.rating ?? 0;

  const bookCoverUrl = book.cover_id
    ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg?default=false`
    : null;

  return (
    <Card className="group relative h-[450px] w-[280px] overflow-hidden border-border/50 bg-card hover:shadow-md transition-all duration-300 py-2">
      <div className="p-5 flex flex-col h-full">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-foreground leading-tight line-clamp-2 text-balance text-lg">
              {book.title}
            </h3>
            <span className="text-xs text-muted-foreground mt-1">
              {book.author}
            </span>
          </div>

          <Dropdown
            book={book}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
          />
        </div>

        <div className="flex-1 mt-4 ">
          {/* {book.cover_url ? ( */}
          {bookCoverUrl && !coverUnavailable ? (
            <img
              src={bookCoverUrl}
              alt={book.title}
              className="w-[300px] h-[220px] object-contain rounded-md"
              onError={() => setCoverUnavailable(true)}
            />
          ) : (
            <div className="w-full h-[220px] bg-border/20 rounded-md flex items-center justify-center">
              <BookOpenTextIcon className="h-8 w-8 text-muted-foreground/50" />
            </div>
          )}
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2">
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
      </div>
    </Card>
  );
};
