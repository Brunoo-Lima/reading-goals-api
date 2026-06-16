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
      <strong className="text-lg font-semibold text-foreground mb-2">
        Estatísticas de Leitura
      </strong>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
          <span className="text-muted-foreground">Avaliação Média</span>
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
            Média de páginas por livro
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
