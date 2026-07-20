import { Card } from '@/components/ui/card';
import { PageContainer } from '@/components/ui/page-container';
import {
  ContentPage,
  DescriptionPage,
  HeaderPage,
  TitlePage,
} from '@/components/ui/title-page';
import { useBooks } from '@/hooks/use-books';
import {
  User,
  BookOpen,
  Target,
  Flame,
  TrendingUp,
  Calendar,
  FileText,
} from 'lucide-react';
import { StatsCard } from './_components/stats-card';
import { ReadingStats } from './_components/reading-stats';
import { useStreak } from '@/hooks/use-streak';
import { PageMeta } from '@/components/page-meta';

export function StatisticsPage() {
  const {
    books,
    completedBooks,
    readingBooks,
    toReadBooks,
    totalPagesRead,
    goal,
  } = useBooks();
  const { streak } = useStreak();

  const stats = [
    {
      label: 'Total de Livros',
      value: books.length,
      icon: BookOpen,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Livros Concluídos',
      value: completedBooks.length,
      icon: Target,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      label: 'Lendo Atualmente',
      value: readingBooks.length,
      icon: BookOpen,
      color: 'text-accent',
      bg: 'bg-accent/10',
    },
    {
      label: 'Quero Ler',
      value: toReadBooks.length,
      icon: FileText,
      color: 'text-muted-foreground',
      bg: 'bg-secondary',
    },
    {
      label: 'Streak Atual',
      value: `${streak.currentStreak} dias`,
      icon: Flame,
      color: 'text-orange-500',
      bg: 'bg-orange-100',
    },
    {
      label: 'Maior Streak',
      value: `${streak.longestStreak} dias`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
    {
      label: 'Páginas Lidas',
      value: totalPagesRead,
      icon: FileText,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      label: 'Meta do Ano',
      value: `${completedBooks.length}/${goal.targetBooks}`,
      icon: Calendar,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
  ];

  // Calculate average rating
  const ratedBooks = completedBooks.filter((b) => b.rating);
  const avgRating =
    ratedBooks.length > 0
      ? (
          ratedBooks.reduce((acc, b) => acc + (b.rating || 0), 0) /
          ratedBooks.length
        ).toFixed(1)
      : 'N/A';

  return (
    <>
      <PageMeta
        title="Minhas Estatísticas"
        description="Suas estatísticas de uso"
      />

      <PageContainer>
        <HeaderPage>
          <ContentPage>
            <TitlePage>Minhas Estatísticas</TitlePage>
            <DescriptionPage>Suas estatísticas de uso</DescriptionPage>
          </ContentPage>
        </HeaderPage>

        {/* Profile Card */}
        <Card className="p-6 bg-card border-border/50">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Leitor</h2>
              <p className="text-muted-foreground">Membro desde 2026</p>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <StatsCard stats={stats} />

        {/* Reading Stats Card */}
        <ReadingStats
          avgRating={avgRating}
          completedBooks={completedBooks}
          totalPagesRead={totalPagesRead}
        />
      </PageContainer>
    </>
  );
}
