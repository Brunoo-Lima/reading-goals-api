import {
  ContentPage,
  DescriptionPage,
  HeaderPage,
  TitlePage,
} from '@/components/ui/title-page';
import { useBooks } from '@/hooks/use-books';
import { useState } from 'react';
import { MainCard } from './_components/main-card/main-card';
import { BookDetails } from './_components/book-details';
import { CardVisualizator } from './_components/card-visualizator';
import { PageContainer } from '@/components/ui/page-container';

export function GoalsPage() {
  const { goal, updateGoal, completedBooks } = useBooks();
  const [editingGoal, setEditingGoal] = useState(false);
  const [newTarget, setNewTarget] = useState(goal.targetBooks.toString());

  const progress = Math.round((completedBooks.length / goal.targetBooks) * 100);
  const remaining = Math.max(0, goal.targetBooks - completedBooks.length);

  // Calculate months remaining
  const currentMonth = new Date().getMonth();
  const monthsRemaining = 12 - currentMonth;
  const booksPerMonth =
    monthsRemaining > 0 ? Math.ceil(remaining / monthsRemaining) : remaining;

  const handleSaveGoal = () => {
    const target = parseInt(newTarget);
    if (target > 0) {
      updateGoal({ targetBooks: target });
    }
    setEditingGoal(false);
  };

  return (
    <PageContainer>
      <HeaderPage>
        <ContentPage>
          <TitlePage>Metas de Leitura</TitlePage>
          <DescriptionPage>
            Defina e acompanhe suas metas anuais
          </DescriptionPage>
        </ContentPage>
      </HeaderPage>

      {/* Main Goal Card */}
      <MainCard
        goal={goal}
        editingGoal={editingGoal}
        setEditingGoal={setEditingGoal}
        progress={progress}
        booksPerMonth={booksPerMonth}
        newTarget={newTarget}
        setNewTarget={setNewTarget}
        remaining={remaining}
        completedBooks={completedBooks}
        onSaveGoal={handleSaveGoal}
      />

      {/* Progress Visualization */}
      <CardVisualizator completedBooks={completedBooks} goal={goal} />

      {/* Completed Books List */}
      {completedBooks.length > 0 && (
        <BookDetails completedBooks={completedBooks} goal={goal} />
      )}
    </PageContainer>
  );
}
