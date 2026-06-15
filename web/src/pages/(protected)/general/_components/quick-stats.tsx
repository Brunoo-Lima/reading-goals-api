import type { IBook } from '@/@types/IBook';
import { Card } from '@/components/ui/card';
import {
  BookOpenIcon,
  CheckCircleIcon,
  FileTextIcon,
  TrendingUpIcon,
} from 'lucide-react';

interface IQuickStatsProps {
  totalPagesRead: number;
  streak: any;
  readingBooks: IBook[];
  completedBooks: IBook[];
}

export const QuickStats = ({
  totalPagesRead,
  completedBooks,
  readingBooks,
  streak,
}: IQuickStatsProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 bg-card border-border/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <FileTextIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">
              {totalPagesRead}
            </p>
            <p className="text-xs text-muted-foreground">Paginas lidas</p>
          </div>
        </div>
      </Card>
      <Card className="p-4 bg-card border-border/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <TrendingUpIcon className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">
              {streak.longestStreak}
            </p>
            <p className="text-xs text-muted-foreground">Maior streak</p>
          </div>
        </div>
      </Card>
      <Card className="p-4 bg-card border-border/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-secondary">
            <BookOpenIcon className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">
              {readingBooks.length}
            </p>
            <p className="text-xs text-muted-foreground">Lendo agora</p>
          </div>
        </div>
      </Card>
      <Card className="p-4 bg-card border-border/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <CheckCircleIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xl font-bold text-foreground">
              {completedBooks.length}
            </p>
            <p className="text-xs text-muted-foreground">Concluidos</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
