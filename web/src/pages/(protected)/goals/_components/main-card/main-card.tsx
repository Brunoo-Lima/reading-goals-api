import type { IBook } from '@/@types/IBook';
import type { IReadingGoal } from '@/@types/IGoal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckIcon, Edit2Icon, TargetIcon, XIcon } from 'lucide-react';
import { StatsBooks } from './stats-books';

interface IMainCardProps {
  goal: IReadingGoal;
  editingGoal: boolean;
  setEditingGoal: (value: boolean) => void;
  progress: number;
  newTarget: string;
  setNewTarget: (value: string) => void;
  onSaveGoal: () => void;
  remaining: number;
  booksPerMonth: number;
  completedBooks: IBook[];
}

export const MainCard = ({
  goal,
  editingGoal,
  setEditingGoal,
  progress,
  newTarget,
  setNewTarget,
  onSaveGoal,
  remaining,
  booksPerMonth,
  completedBooks,
}: IMainCardProps) => {
  return (
    <Card className="p-6 bg-card border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-primary/10">
            <TargetIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Meta {goal.year}
            </h2>
            <p className="text-sm text-muted-foreground">
              Sua meta anual de leitura
            </p>
          </div>
        </div>
        {!editingGoal ? (
          <Button
            variant="ghost"
            size="sm"
            className="cursor-pointer"
            onClick={() => setEditingGoal(true)}
          >
            <Edit2Icon className="h-4 w-4 mr-2" />
            Editar
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer"
              onClick={() => setEditingGoal(false)}
            >
              <XIcon className="h-4 w-4" />
            </Button>
            <Button size="icon" className="cursor-pointer" onClick={onSaveGoal}>
              <CheckIcon className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {editingGoal ? (
        <div className="space-y-4">
          <div>
            <Label htmlFor="target">Quantos livros quer ler este ano?</Label>
            <Input
              id="target"
              type="number"
              min="1"
              value={newTarget}
              onChange={(e) => setNewTarget(e.target.value)}
              className="mt-2"
            />
          </div>
        </div>
      ) : (
        <StatsBooks
          goal={goal}
          completedBooks={completedBooks}
          progress={progress}
          remaining={remaining}
          booksPerMonth={booksPerMonth}
        />
      )}
    </Card>
  );
};
