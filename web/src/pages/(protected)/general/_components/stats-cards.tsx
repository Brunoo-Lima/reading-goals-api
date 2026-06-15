import type { IBook } from '@/@types/IBook';
import { Card } from '@/components/ui/card';
import {
  BookMarkedIcon,
  BookOpenIcon,
  CheckCircle2Icon,
  LibraryIcon,
} from 'lucide-react';

interface StatsCardsProps {
  books: IBook[];
}

export const StatsCards = ({ books }: StatsCardsProps) => {
  const stats = {
    total: books.length,
    toRead: books.filter((b) => b.status === 'WISHLIST').length,
    reading: books.filter((b) => b.status === 'READING').length,
    completed: books.filter((b) => b.status === 'COMPLETED').length,
  };

  const cards = [
    {
      label: 'Total de Livros',
      value: stats.total,
      icon: LibraryIcon,
      color: 'text-foreground',
      bg: 'bg-secondary',
    },
    {
      label: 'Quero Ler',
      value: stats.toRead,
      icon: BookMarkedIcon,
      color: 'text-muted-foreground',
      bg: 'bg-secondary',
    },
    {
      label: 'Lendo',
      value: stats.reading,
      icon: BookOpenIcon,
      color: 'text-accent',
      bg: 'bg-accent/10',
    },
    {
      label: 'Concluídos',
      value: stats.completed,
      icon: CheckCircle2Icon,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.label} className="p-4 bg-card border-border/50">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${card.bg}`}>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.label}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
