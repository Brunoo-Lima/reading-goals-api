import type { IBook } from '@/@types/IBook';
import type { IReadingGoal } from '@/@types/IGoal';
import { Progress } from '@/components/ui/progress';
import {
  BookOpenIcon,
  TargetIcon,
  TrendingUpIcon,
  TrophyIcon,
} from 'lucide-react';

interface IStatsBooksProps {
  goal: IReadingGoal;
  completedBooks: IBook[];
  progress: number;
  remaining: number;
  booksPerMonth: number;
}

export const StatsBooks = ({
  goal,
  completedBooks,
  progress,
  remaining,
  booksPerMonth,
}: IStatsBooksProps) => {
  return (
    <div className="space-y-6">
      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Progresso</span>
          <span className="text-sm font-medium text-foreground">
            {completedBooks.length} de {goal.targetBooks} livros
          </span>
        </div>
        <Progress value={progress} className="h-3" />
        <p className="text-xs text-muted-foreground mt-2">
          {progress}% concluído
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-secondary">
          <div className="flex items-center gap-2 mb-2">
            <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Concluídos</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {completedBooks.length}
          </p>
        </div>
        <div className="p-4 rounded-lg bg-secondary">
          <div className="flex items-center gap-2 mb-2">
            <TargetIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Faltam</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{remaining}</p>
        </div>
        <div className="p-4 rounded-lg bg-secondary">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Por mês</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{booksPerMonth}</p>
        </div>
        <div className="p-4 rounded-lg bg-secondary">
          <div className="flex items-center gap-2 mb-2">
            <TrophyIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Meta</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {goal.targetBooks}
          </p>
        </div>
      </div>
    </div>
  );
};
