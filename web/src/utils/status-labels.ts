import type { StatusReading } from '@/@types/IBook';

export const statusLabels: Record<StatusReading, string> = {
  WISHLIST: 'Quero Ler',
  READING: 'Lendo',
  COMPLETED: 'Concluído',
  ABANDONED: 'Abandonado',
};

export const statusColors: Record<StatusReading, string> = {
  WISHLIST: 'bg-secondary text-secondary-foreground',
  READING: 'bg-accent text-accent-foreground',
  COMPLETED: 'bg-primary text-primary-foreground',
  ABANDONED: 'bg-destructive text-destructive-foreground',
};
