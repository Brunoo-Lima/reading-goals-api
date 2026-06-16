import type { IBook } from '@/@types/IBook';
import type { IReadingGoal } from '@/@types/IGoal';
import { Card } from '@/components/ui/card';
import { BookOpenIcon } from 'lucide-react';

interface ICardVisualizatorProps {
  completedBooks: IBook[];
  goal: IReadingGoal;
}

export const CardVisualizator = ({
  completedBooks,
  goal,
}: ICardVisualizatorProps) => {
  return (
    <Card className="p-6 bg-card border-border/50">
      <strong className="text-lg font-semibold text-foreground mb-2">
        Visualização
      </strong>

      <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
        {Array.from({ length: goal.targetBooks }).map((_, index) => (
          <div
            key={index}
            className={`aspect-square rounded-lg flex items-center justify-center ${
              index < completedBooks.length
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary'
            }`}
          >
            <BookOpenIcon className="size-6" />
          </div>
        ))}
      </div>
      <small className="text-sm text-muted-foreground mt-2">
        Cada ícone representa um livro da sua meta. Os preenchidos são os que
        você já concluiu.
      </small>
    </Card>
  );
};
