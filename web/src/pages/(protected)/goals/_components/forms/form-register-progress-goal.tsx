import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGoals } from '@/hooks/use-goals';
import { TrendingUpIcon } from 'lucide-react';
import { useState, type SubmitEvent } from 'react';

interface IFormRegisterProgressGoalProps {
  unit: string;
  goalId: string;
}

export const FormRegisterProgressGoal = ({
  unit,
  goalId,
}: IFormRegisterProgressGoalProps) => {
  const [progressValue, setProgressValue] = useState<string>('');
  const [progressNote, setProgressNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { registerProgressGoal } = useGoals();

  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    const data = {
      value: Number(progressValue),
      note: progressNote,
    };

    try {
      await registerProgressGoal(goalId, data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className="rounded-lg bg-secondary p-4 space-y-3"
    >
      <p className="text-sm font-medium text-foreground flex items-center gap-2">
        <TrendingUpIcon className="h-4 w-4 text-primary" />
        Registrar progresso
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="number"
          min="1"
          placeholder={`Valor (${unit})`}
          value={progressValue}
          onChange={(e) => setProgressValue(e.target.value)}
          className="sm:w-40 bg-card"
        />
        <Input
          placeholder="Nota (opcional)"
          value={progressNote}
          onChange={(e) => setProgressNote(e.target.value)}
          className="flex-1 bg-card"
        />
        <Button type="submit">
          {isSubmitting ? 'Registrando...' : 'Registrar'}
        </Button>
      </div>
    </form>
  );
};
