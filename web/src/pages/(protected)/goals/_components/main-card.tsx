import type { IBook } from '@/@types/IBook';
import type { IReadingGoal } from '@/@types/IGoal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  BookOpenIcon,
  CheckIcon,
  Edit2Icon,
  TargetIcon,
  TrendingUpIcon,
  TrophyIcon,
  XIcon,
} from 'lucide-react';

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
              onClick={() => setEditingGoal(false)}
            >
              <XIcon className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={onSaveGoal}>
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
              {progress}% concluido
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-secondary">
              <div className="flex items-center gap-2 mb-2">
                <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Concluidos
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {completedBooks.length}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-secondary">
              <div className="flex items-center gap-2 mb-2">
                <TargetIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Faltam</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{remaining}</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Por mes</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {booksPerMonth}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-secondary">
              <div className="flex items-center gap-2 mb-2">
                <TrophyIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Meta</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {goal.targetBooks}
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
