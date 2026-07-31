import { useState } from 'react';
import { Card } from '@/components/ui/card';

import { TargetIcon } from 'lucide-react';
import { useGoals } from '@/hooks/use-goals';
import { PageMeta } from '@/components/page-meta';
import {
  ContentPage,
  DescriptionPage,
  HeaderPage,
  TitlePage,
} from '@/components/ui/title-page';
import { PageContainer } from '@/components/ui/page-container';
import { AddGoalButton } from './_components/add-goal-button';
import { CardGoal } from './_components/card-goal';
import { useBooks } from '@/hooks/use-books';
import { AlertDialogDeleteGoal } from './_components/alert-dialog-delete-goal';

export function GoalsPage() {
  const {
    goals,
    deleteGoal,
    toggleGoalActive,
    selectedGoalId,
    setSelectedGoalId,
  } = useGoals();
  const { books } = useBooks();
  const [showDialogDelete, setShowDialogDelete] = useState<boolean>(false);
  // Estado do registro de progresso por meta
  const [progressValue, setProgressValue] = useState<Record<string, string>>(
    {},
  );
  const [progressNote, setProgressNote] = useState<Record<string, string>>({});

  const activeGoals = goals.filter((g) => g.is_active);
  const inactiveGoals = goals.filter((g) => !g.is_active);

  const handleLogProgress = (goalId: string) => {
    // const value = parseInt(progressValue[goalId] || '');
    // if (!value || value <= 0) return;
    // addGoalProgress(goalId, value, progressNote[goalId]);
    // setProgressValue((prev) => ({ ...prev, [goalId]: '' }));
    // setProgressNote((prev) => ({ ...prev, [goalId]: '' }));
  };

  const handleDeleteGoal = (goalId: string) => {
    if (selectedGoalId) {
      deleteGoal(goalId);
      setShowDialogDelete(false);
    }
  };

  const handleOpenDialogDeleteGoal = (goalId: string) => {
    setSelectedGoalId(goalId);
    setShowDialogDelete(true);
  };

  return (
    <>
      <PageMeta
        title="Minhas Metas"
        description="Gerencie suas metas de leitura"
      />

      <PageContainer>
        <HeaderPage>
          <ContentPage>
            <TitlePage>Metas de Leitura</TitlePage>
            <DescriptionPage>
              Crie metas de diferentes tipos e registre seu progresso
            </DescriptionPage>
          </ContentPage>

          <AddGoalButton />
        </HeaderPage>

        {activeGoals.length === 0 && inactiveGoals.length === 0 ? (
          <Card className="p-12 bg-card border-border/50 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 rounded-full bg-primary/10">
                <TargetIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">
                Nenhuma meta ainda
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Crie sua primeira meta de leitura para começar a acompanhar seu
                progresso.
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {activeGoals.map((goal) => (
              <CardGoal
                key={goal.id}
                goal={goal}
                bookTitle={
                  goal.book_id
                    ? books.find((b) => b.id === goal.book_id)?.title
                    : undefined
                }
                progressValue={progressValue[goal.id] || ''}
                progressNote={progressNote[goal.id] || ''}
                onProgressValueChange={(v) =>
                  setProgressValue((prev) => ({ ...prev, [goal.id]: v }))
                }
                onProgressNoteChange={(v) =>
                  setProgressNote((prev) => ({ ...prev, [goal.id]: v }))
                }
                onLogProgress={() => handleLogProgress(goal.id)}
                onToggleActive={() => toggleGoalActive(goal.id)}
                onDelete={() => handleOpenDialogDeleteGoal(goal.id)}
              />
            ))}
          </div>
        )}

        {/* Inactive Goals */}
        {inactiveGoals.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              Metas Inativas
            </h2>
            {inactiveGoals.map((goal) => (
              <CardGoal
                key={goal.id}
                goal={goal}
                bookTitle={
                  goal.book_id
                    ? books.find((b) => b.id === goal.book_id)?.title
                    : undefined
                }
                progressValue={progressValue[goal.id] || ''}
                progressNote={progressNote[goal.id] || ''}
                onProgressValueChange={(v) =>
                  setProgressValue((prev) => ({ ...prev, [goal.id]: v }))
                }
                onProgressNoteChange={(v) =>
                  setProgressNote((prev) => ({ ...prev, [goal.id]: v }))
                }
                onLogProgress={() => handleLogProgress(goal.id)}
                onToggleActive={() => toggleGoalActive(goal.id)}
                onDelete={() => handleOpenDialogDeleteGoal(goal.id)}
              />
            ))}
          </div>
        )}

        {showDialogDelete && (
          <AlertDialogDeleteGoal
            open={showDialogDelete}
            onOpenChange={setShowDialogDelete}
            onDelete={() => handleDeleteGoal(selectedGoalId || '')}
          />
        )}
      </PageContainer>
    </>
  );
}
