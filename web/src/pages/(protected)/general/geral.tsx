import { useBooks } from '@/hooks/use-books';
import { StatsCards } from './_components/stats-cards';
import { CardProgressDaily } from './_components/card-progress-daily';
import { CardReadingCurrently } from './_components/card-reading-currently';
import { QuickStats } from './_components/quick-stats';
import { ReadingGoalCard } from './_components/reading-goal-card';
import { useStreak } from '@/hooks/use-streak';
import {
  ContentPage,
  DescriptionPage,
  HeaderPage,
  TitlePage,
} from '@/components/ui/title-page';
import { PageContainer } from '@/components/ui/page-container';
import { PageMeta } from '@/components/page-meta';

export function GeneralPage() {
  const { books, goal, completedBooks, readingBooks, totalPagesRead } =
    useBooks();
  const { streak } = useStreak();

  return (
    <>
      <PageMeta
        title="Visão Geral"
        description="Acompanhe seu progresso de leitura"
      />

      <PageContainer>
        <HeaderPage>
          <ContentPage>
            <TitlePage>Visão Geral</TitlePage>
            <DescriptionPage>
              {' '}
              Acompanhe seu progresso de leitura
            </DescriptionPage>
          </ContentPage>
        </HeaderPage>

        {/* Stats Cards */}
        <StatsCards books={books} />

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Reading Goal */}
          <ReadingGoalCard
            goal={goal}
            completedThisYear={completedBooks.length}
          />

          {/* Daily Progress Card */}
          <CardProgressDaily />
        </div>

        {/* Currently Reading */}
        {readingBooks.length > 0 && (
          <CardReadingCurrently readingBooks={readingBooks} />
        )}

        {/* Quick Stats */}
        <QuickStats totalPagesRead={totalPagesRead} streak={streak} />
      </PageContainer>
    </>
  );
}
