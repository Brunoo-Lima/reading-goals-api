import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircleIcon, ClockIcon } from 'lucide-react';

interface ICardProgressDailyProps {
  todayProgress: {
    pagesRead: number;
    wordsRead: number;
    timeSpent: number;
  };
  hasReadToday: boolean;
}

export const CardProgressDaily = ({
  todayProgress,
  hasReadToday,
}: ICardProgressDailyProps) => {
  return (
    <Card className="p-6 bg-card border-border/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Progresso Diario</h3>
        <ClockIcon className="h-5 w-5 text-muted-foreground" />
      </div>

      {hasReadToday ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <CheckCircleIcon className="h-5 w-5" />
            <span className="font-medium">Voce ja leu hoje!</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-secondary">
              <p className="text-2xl font-bold text-foreground">
                {todayProgress.pagesRead}
              </p>
              <p className="text-xs text-muted-foreground">paginas lidas</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary">
              <p className="text-2xl font-bold text-foreground">
                {todayProgress.minutesRead}
              </p>
              <p className="text-xs text-muted-foreground">minutos lidos</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Voce ainda nao registrou leitura hoje. Mantenha seu streak!
          </p>
          <Button onClick={() => recordReading(10, 15)} className="w-full">
            Registrar Leitura
          </Button>
        </div>
      )}
    </Card>
  );
};
