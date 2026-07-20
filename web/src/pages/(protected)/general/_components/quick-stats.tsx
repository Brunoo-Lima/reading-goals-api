import { Card } from '@/components/ui/card';
import { FileTextIcon, TrendingUpIcon } from 'lucide-react';

interface IQuickStatsProps {
  totalPagesRead: number;
  streak: any;
}

export const QuickStats = ({ totalPagesRead, streak }: IQuickStatsProps) => {
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
    </div>
  );
};
