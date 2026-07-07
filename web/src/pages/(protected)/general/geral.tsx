import { useBooks } from '@/hooks/use-books';
import { StatsCards } from './_components/stats-cards';
import { CardProgressDaily } from './_components/card-progress-daily';
import { CardReadingCurrently } from './_components/card-reading-currently';
import { QuickStats } from './_components/quick-stats';
import { ReadingGoalCard } from './_components/reading-goal-card';
import { useStreak } from '@/hooks/use-streak';

export function GeneralPage() {
  const { books, goal, completedBooks, readingBooks, totalPagesRead } =
    useBooks();
  const { streak } = useStreak();

  return (
    <section className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Visão Geral</h1>
        <p className="text-muted-foreground">
          Acompanhe seu progresso de leitura
        </p>
      </div>

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
      <QuickStats
        totalPagesRead={totalPagesRead}
        completedBooks={completedBooks}
        readingBooks={readingBooks}
        streak={streak}
      />
    </section>
  );
}
