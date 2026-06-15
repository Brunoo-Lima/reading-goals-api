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
      <h3 className="font-semibold text-foreground mb-4">Visualizacao</h3>
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
            <BookOpenIcon className="h-4 w-4" />
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground mt-4">
        Cada icone representa um livro da sua meta. Os preenchidos sao os que
        voce ja concluiu.
      </p>
    </Card>
  );
};
