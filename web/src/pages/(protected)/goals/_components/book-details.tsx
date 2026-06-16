import type { IBook } from '@/@types/IBook';
import type { IReadingGoal } from '@/@types/IGoal';
import { Card } from '@/components/ui/card';

interface IBookDetailsProps {
  completedBooks: IBook[];
  goal: IReadingGoal;
}

export const BookDetails = ({ completedBooks, goal }: IBookDetailsProps) => {
  return (
    <Card className="p-6 bg-card border-border/50">
      <strong className="text-lg font-semibold text-foreground mb-2">
        Livros Concluidos em {goal.year}
      </strong>

      <div className="space-y-3">
        {completedBooks.map((book, index) => (
          <div
            key={book.id}
            className="flex items-center gap-4 p-3 rounded-lg bg-secondary"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">
                {book.title}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {book.author}
              </p>
            </div>
            {book.rating && (
              <div className="flex items-center gap-1 text-yellow-500">
                {Array.from({ length: book.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="h-4 w-4 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
