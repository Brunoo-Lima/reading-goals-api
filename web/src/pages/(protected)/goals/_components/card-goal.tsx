import { GOAL_TYPE_LABELS, GOAL_TYPE_UNITS, type IGoal } from '@/@types/IGoal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatDate } from '@/utils/format-date';
import {
  BookMarkedIcon,
  PowerIcon,
  TargetIcon,
  Trash2Icon,
  TrophyIcon,
} from 'lucide-react';
import { FormRegisterProgressGoal } from './forms/form-register-progress-goal';

interface ICardGoalProps {
  goal: IGoal;
  bookTitle?: string;
  onToggleActive: () => void;
  onDelete: () => void;
}

export const CardGoal = ({
  goal,
  bookTitle,
  onToggleActive,
  onDelete,
}: ICardGoalProps) => {
  const currentValue = goal.current_value || 0;

  const percent = Math.min(
    100,
    Math.round((currentValue / goal.target_value) * 100),
  );
  const isComplete = currentValue >= goal.target_value;
  const unit = GOAL_TYPE_UNITS[goal.type];

  return (
    <Card className="p-6 bg-card border-border/50 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-xl bg-primary/10">
            {isComplete ? (
              <TrophyIcon className="h-5 w-5 text-primary" />
            ) : goal.type === 'SPECIFIC_BOOK' ? (
              <BookMarkedIcon className="h-5 w-5 text-primary" />
            ) : (
              <TargetIcon className="h-5 w-5 text-primary" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-foreground">
                {GOAL_TYPE_LABELS[goal.type]}
              </h3>
              {isComplete && (
                <Badge className="bg-primary/10 text-primary border-0">
                  Concluída
                </Badge>
              )}
              {!goal.is_active && <Badge variant="secondary">Inativa</Badge>}
            </div>
            {bookTitle && (
              <p className="text-sm text-muted-foreground">{bookTitle}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {formatDate(goal.start_date)}
              {goal.end_date ? ` — ${formatDate(goal.end_date)}` : ''}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleActive}
            title={goal.is_active ? 'Desativar' : 'Ativar'}
          >
            <PowerIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            title="Excluir"
          >
            <Trash2Icon className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Progresso</span>
          <span className="text-sm font-medium text-foreground">
            {goal.current_value} de {goal.target_value} {unit}
          </span>
        </div>
        <Progress value={percent} className="h-3" />
        <p className="text-xs text-muted-foreground mt-2">
          {percent}% concluído
        </p>
      </div>

      {/* Log Progress */}
      {goal.is_active && !isComplete && (
        <FormRegisterProgressGoal unit={unit} goalId={goal.id} />
      )}

      {/* Progress History */}
      {goal.progress && goal.progress.length > 0 && (
        <div>
          <p className="text-sm font-medium text-foreground mb-3">
            Histórico de progresso
          </p>
          <div className="space-y-2">
            {goal.progress.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between gap-4 text-sm py-2 border-b border-border/50 last:border-0"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-medium text-foreground shrink-0">
                    + {entry.value} {unit}
                  </span>
                  {entry.note && (
                    <span className="text-muted-foreground truncate">
                      {entry.note}
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground shrink-0">
                  {formatDate(entry.logged_at)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
