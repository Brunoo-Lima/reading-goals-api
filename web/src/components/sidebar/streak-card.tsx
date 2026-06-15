import { useBooks } from '@/hooks/use-books';
import { cn } from '@/lib/utils';
import { FlameIcon } from 'lucide-react';

export const StreakCard = () => {
  const { streak } = useBooks();

  return (
    <div className="p-4">
      <div className="p-3 rounded-xl bg-gradient-to-br from-accent/20 to-primary/10 border border-accent/30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/20">
            <FlameIcon
              className={cn(
                'h-5 w-5',
                streak.currentStreak > 0
                  ? 'text-orange-500'
                  : 'text-muted-foreground',
              )}
            />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">
              {streak.currentStreak}
            </p>
            <p className="text-xs text-muted-foreground">
              {streak.currentStreak === 1 ? 'dia de streak' : 'dias de streak'}
            </p>
          </div>
        </div>
        {streak.longestStreak > 0 && (
          <p className="text-xs text-muted-foreground mt-2">
            Recorde: {streak.longestStreak} dias
          </p>
        )}
      </div>
    </div>
  );
};
