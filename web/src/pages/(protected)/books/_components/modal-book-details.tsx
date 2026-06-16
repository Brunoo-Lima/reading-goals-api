import type { IBook } from '@/@types/IBook';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Star, BookOpen, Calendar, FileText } from 'lucide-react';

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
  if (!book) return null;

  const progress =
    book.currentPage && book.total_pages
      ? Math.round((book.currentPage / book.total_pages) * 100)
      : 0;

  const statusLabels = {
    WISHLIST: 'Quero Ler',
    READING: 'Lendo',
    COMPLETED: 'Concluído',
    ABANDONED: 'Abandonado',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl pr-8">{book.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <p className="text-muted-foreground">{book.author}</p>
            <span className="inline-block mt-2 text-xs px-2.5 py-1 rounded-full font-medium bg-secondary text-secondary-foreground">
              {statusLabels[book.status]}
            </span>
          </div>

          {book.total_pages && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
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
                Página {book.currentPage} de {book.total_pages}
              </p>
            </div>
          )}

          {book.status === 'COMPLETED' && book.rating && (
            <div>
              <p className="text-sm font-medium mb-2">Sua Avaliação</p>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < book.rating!
                        ? 'fill-accent text-accent'
                        : 'text-border'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {(book.start_date || book.end_date) && (
            <div className="flex items-start gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
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

          {book.notes && (
            <div>
              <div className="flex items-center gap-2 text-sm font-medium mb-2">
                <FileText className="h-4 w-4" />
                <span>Notas</span>
              </div>
              <p className="text-sm text-muted-foreground bg-secondary/30 rounded-lg p-3">
                {book.notes}
              </p>
            </div>
          )}

          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={() => onOpenChange(false)}
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
