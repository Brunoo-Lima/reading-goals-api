import type { IBook } from '@/@types/IBook';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpenIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ICardReadingCurrentlyProps {
  readingBooks: IBook[];
}

export const CardReadingCurrently = ({
  readingBooks,
}: ICardReadingCurrentlyProps) => {
  return (
    <Card className="p-6 bg-card border-border/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Lendo Agora</h3>
        <Link to="/livros">
          <Button variant="ghost" size="sm">
            Ver todos
          </Button>
        </Link>
      </div>
      <div className="space-y-4">
        {readingBooks.slice(0, 3).map((book) => {
          const progress =
            book.total_pages && book.current_page
              ? Math.round((book.current_page / book.total_pages) * 100)
              : 0;

          return (
            <div key={book.id} className="flex items-center gap-4">
              <div className="w-12 h-16 rounded bg-secondary flex items-center justify-center flex-shrink-0">
                <BookOpenIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">
                  {book.title}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {book.author}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={progress} className="h-2 flex-1" />
                  <span className="text-xs text-muted-foreground">
                    {progress}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
