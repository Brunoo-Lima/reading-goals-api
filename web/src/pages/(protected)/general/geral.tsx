import { useBooks } from '@/hooks/use-books';
import { StatsCards } from './_components/stats-cards';
import { CardProgressDaily } from './_components/card-progress-daily';
import { CardReadingCurrently } from './_components/card-reading-currently';
import { QuickStats } from './_components/quick-stats';
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
  const { books, readingBooks, totalPagesRead } = useBooks();
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
              Acompanhe seu progresso de leitura
            </DescriptionPage>
          </ContentPage>
        </HeaderPage>

        {/* Stats Cards */}
        <StatsCards books={books} />

        {/* Quick Stats */}
        <QuickStats totalPagesRead={totalPagesRead} streak={streak} />

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Reading Goal */}
          {/* <ReadingGoalCard
            goal={goal}
            completedThisYear={completedBooks.length}
          /> */}
        </div>

        {/* Currently Reading */}
        <div className="grid lg:grid-cols-[400px_1fr] gap-6">
          {/* Daily Progress Card */}
          <CardProgressDaily hasReadToday={totalPagesRead > 0} />

          {readingBooks.length > 0 && (
            <CardReadingCurrently readingBooks={readingBooks} />
          )}
        </div>
      </PageContainer>
    </>
  );
}
