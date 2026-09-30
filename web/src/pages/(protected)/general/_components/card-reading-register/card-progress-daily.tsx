import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircleIcon, ClockIcon } from 'lucide-react';
import { FormRegisterReading } from './form-register-reading';
import { useState } from 'react';
import type { IBook } from '@/@types/IBook';
import { useStreak } from '@/hooks/use-streak';

interface ICardProgressDailyProps {
  books: IBook[];
}

export const CardProgressDaily = ({ books }: ICardProgressDailyProps) => {
  const { streak } = useStreak();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="h-max p-6 bg-card border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Progresso Diário</h3>
          <ClockIcon className="h-5 w-5 text-muted-foreground" />
        </div>

        {streak.currentStreak > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <CheckCircleIcon className="h-5 w-5" />
              <span className="font-medium">Você já leu hoje!</span>
            </div>

            <Button onClick={() => setOpen(true)} className="w-full">
              Registrar mais Leitura?
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Você ainda não registrou leitura hoje. Mantenha seu streak!
            </p>
            <Button onClick={() => setOpen(true)} className="w-full">
              Registrar Leitura
            </Button>
          </div>
        )}
      </Card>

      <FormRegisterReading open={open} onOpenChange={setOpen} books={books} />
    </>
  );
};
