import type { IBook } from '@/@types/IBook';
import { statusLabels } from '@/utils/status-labels';
import { BookOpenIcon, CalendarIcon, StarIcon } from 'lucide-react';

interface IDetailBookProps {
  book: IBook;
}

export const DetailBook = ({ book }: IDetailBookProps) => {
  const progress =
    book.current_page && book.total_pages
      ? Math.round((book.current_page / book.total_pages) * 100)
      : 0;

  const rating = book.rating ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-muted-foreground">Autor: {book.author}</p>
        <span className="inline-block mt-2 text-xs px-2.5 py-1 rounded-full font-medium bg-secondary text-secondary-foreground">
          {statusLabels[book.status]}
        </span>
      </div>

      {book.total_pages && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpenIcon className="h-4 w-4" />
          <span>{book.total_pages} páginas</span>
        </div>
      )}

      {book.status === 'READING' && book.total_pages && (
        <div className="bg-secondary/50 rounded-lg p-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium">Progresso de Leitura</span>
            <span className="text-muted-foreground">{progress}%</span>
          </div>
          <div className="h-3 bg-background rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Página {book.current_page} de {book.total_pages}
          </p>
        </div>
      )}

      {book.status === 'COMPLETED' && rating && (
        <div>
          <p className="text-sm font-medium mb-2">Sua Avaliação</p>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={`h-5 w-5 ${
                  i < rating ? 'fill-accent text-accent' : 'text-border'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {(book.start_date || book.end_date) && (
        <div className="flex items-start gap-2 text-sm">
          <CalendarIcon className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div>
            {book.start_date && (
              <p>
                <span className="text-muted-foreground">Iniciado: </span>
                {new Date(book.start_date).toLocaleDateString('pt-BR')}
              </p>
            )}
            {book.end_date && (
              <p>
                <span className="text-muted-foreground">Concluído: </span>
                {new Date(book.end_date).toLocaleDateString('pt-BR')}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
