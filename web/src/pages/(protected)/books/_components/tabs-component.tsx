import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpenIcon, PlusIcon } from 'lucide-react';
import { CardBook } from './card-book/card-book';
import { useBooks } from '@/hooks/use-books';
import { useState } from 'react';
import type { IBook, StatusReading } from '@/@types/IBook';
import { ModalBookDetails } from './modal-book-details/modal-book-details';
import { useGetBookById } from '@/services/book';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ITabsComponentsProps {
  onEditBook: (book: IBook) => void;
  onAddBook: () => void;
}

export const TabsComponent = ({
  onEditBook,
  onAddBook,
}: ITabsComponentsProps) => {
  const { books, deleteBook, getBooksByStatus, book, setBook } = useBooks();

  const [activeTab, setActiveTab] = useState<string>('all');
  const getBookById = useGetBookById();

  const handleView = async (book: IBook) => {
    const bookData = await getBookById.mutateAsync(book.id);
    setBook(bookData);
  };

  const handleDeleteBook = (book: IBook) => {
    deleteBook(book.id);
  };

  const filteredBooks =
    activeTab === 'all' ? books : getBooksByStatus(activeTab as StatusReading);

  return (
    <>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6 "
      >
        <div className="hidden sm:block">
          <TabsList className="bg-card border border-border/50 *:cursor-pointer w-full *:flex-1">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="READING">Lendo</TabsTrigger>
            <TabsTrigger value="WISHLIST">Quero Ler</TabsTrigger>
            <TabsTrigger value="COMPLETED">Concluidos</TabsTrigger>
            <TabsTrigger value="ABANDONED">Abandonados</TabsTrigger>
          </TabsList>
        </div>

        <div className="sm:hidden">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="READING">Lendo</SelectItem>
              <SelectItem value="WISHLIST">Quero Ler</SelectItem>
              <SelectItem value="COMPLETED">Concluidos</SelectItem>
              <SelectItem value="ABANDONED">Abandonados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value={activeTab} className="mt-0">
          {filteredBooks.length === 0 ? (
            <div className="text-center py-16">
              <BookOpenIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Nenhum livro encontrado nesta categoria.
              </p>
              <Button variant="outline" className="mt-4" onClick={onAddBook}>
                <PlusIcon className="h-4 w-4 mr-2" />
                Adicionar Livro
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBooks.map((book) => (
                <CardBook
                  key={book.id}
                  book={book}
                  onEdit={onEditBook}
                  onDelete={handleDeleteBook}
                  onView={handleView}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <ModalBookDetails
        book={book}
        open={!!book}
        onOpenChange={(open) => {
          if (!open) setBook(null);
        }}
      />
    </>
  );
};
