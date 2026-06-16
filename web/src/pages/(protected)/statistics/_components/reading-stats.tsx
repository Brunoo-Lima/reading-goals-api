import type { IBook } from '@/@types/IBook';
import { Card } from '@/components/ui/card';

interface IReadingStatsProps {
  avgRating: number | string;
  completedBooks: IBook[];
  totalPagesRead: number;
}

export const ReadingStats = ({
  avgRating,
  completedBooks,
  totalPagesRead,
}: IReadingStatsProps) => {
  return (
    <Card className="p-6 bg-card border-border/50">
      <h3 className="font-semibold text-foreground mb-4">
        Estatisticas de Leitura
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
          <span className="text-muted-foreground">Avaliacao Media</span>
          <span className="font-semibold text-foreground">{avgRating} / 5</span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
          <span className="text-muted-foreground">Livros este ano</span>
          <span className="font-semibold text-foreground">
            {completedBooks.length}
          </span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
          <span className="text-muted-foreground">
            Media de paginas por livro
          </span>
          <span className="font-semibold text-foreground">
            {completedBooks.length > 0
              ? Math.round(totalPagesRead / completedBooks.length)
              : 'N/A'}
          </span>
        </div>
      </div>
    </Card>
  );
};
