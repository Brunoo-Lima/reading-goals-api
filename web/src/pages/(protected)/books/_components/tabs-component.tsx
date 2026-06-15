import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpenIcon, PlusIcon } from 'lucide-react';
import { BookCard } from './book-card';

interface ITabsComponentProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  filteredBooks: any[];
  onEdit: (book: any) => void;
  onDeleteBook: (book: any) => void;
  onView: (book: any) => void;
}
export const TabsComponent = ({
  activeTab,
  setActiveTab,
  filteredBooks,
  onEdit: handleEdit,
  onDeleteBook: deleteBook,
  onView: handleView,
}: ITabsComponentProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="bg-card border border-border/50">
        <TabsTrigger value="all">Todos</TabsTrigger>
        <TabsTrigger value="READING">Lendo</TabsTrigger>
        <TabsTrigger value="WISHLIST">Quero Ler</TabsTrigger>
        <TabsTrigger value="COMPLETED">Concluidos</TabsTrigger>
        <TabsTrigger value="ABANDONED">Abandonados</TabsTrigger>
      </TabsList>

      <TabsContent value={activeTab} className="mt-0">
        {filteredBooks.length === 0 ? (
          <div className="text-center py-16">
            <BookOpenIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">
              Nenhum livro encontrado nesta categoria.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              // onClick={() => {
              //   setEditingBook(null);
              //   setShowForm(true);
              // }}
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Adicionar Livro
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={handleEdit}
                onDelete={deleteBook}
                onView={handleView}
              />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};
