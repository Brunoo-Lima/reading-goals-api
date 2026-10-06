import { Button } from '@/components/ui/button';
import { BookOpenIcon, PlusIcon } from 'lucide-react';

interface IBooksEmptyProps {
  createBook: () => void;
}

export const BooksEmpty = ({ createBook }: IBooksEmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <BookOpenIcon className="h-12 w-12 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">
        Você não está lendo nenhum livro no momento.
      </p>
      <Button onClick={createBook} className="gap-2 cursor-pointer">
        <PlusIcon className="size-5" />
        <p>Novo Livro</p>
      </Button>
    </div>
  );
};
