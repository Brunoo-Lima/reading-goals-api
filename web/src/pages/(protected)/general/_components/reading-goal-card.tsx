'use client';

import type { IReadingGoal } from '@/@types/IGoal';
import { Card } from '@/components/ui/card';
import { Target, TrendingUp } from 'lucide-react';

interface ReadingGoalCardProps {
  goal: IReadingGoal;
  completedThisYear: number;
}

export function ReadingGoalCard({
  goal,
  completedThisYear,
}: ReadingGoalCardProps) {
  const progress = Math.round((completedThisYear / goal.targetBooks) * 100);
  const remaining = goal.targetBooks - completedThisYear;

  return (
    <Card className="p-6 bg-card border-border/50">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-primary/10">
          <Target className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">
            Meta de Leitura {goal.year}
          </h3>
          <p className="text-sm text-muted-foreground">
            {completedThisYear} de {goal.targetBooks} livros
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="h-3 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-700"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{progress}% concluído</span>
          {remaining > 0 ? (
            <span className="text-muted-foreground">
              Faltam {remaining} {remaining === 1 ? 'livro' : 'livros'}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-primary font-medium">
              <TrendingUp className="h-4 w-4" />
              Meta atingida!
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
