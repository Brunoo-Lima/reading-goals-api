import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpenIcon, PlusIcon } from 'lucide-react';
import { CardBook } from './card-book/card-book';
import { useBooks } from '@/hooks/use-books';
import { useState } from 'react';
import type { IBook, StatusReading } from '@/@types/IBook';

export const TabsComponent = () => {
  const { books, addBook, updateBook, deleteBook, getBooksByStatus } =
    useBooks();

  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<IBook | null>(null);
  const [viewingBook, setViewingBook] = useState<IBook | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');

  const handleSubmit = (bookData: Omit<IBook, 'id' | 'createdAt'>) => {
    if (editingBook) {
      updateBook(editingBook.id, bookData);
    } else {
      addBook(bookData);
    }
  };

  const handleEdit = (book: IBook) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleView = (book: IBook) => {
    setViewingBook(book);
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
        className="space-y-6"
      >
        <TabsList className="bg-card border border-border/50 *:cursor-pointer">
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
                <CardBook
                  key={book.id}
                  book={book}
                  onEdit={handleEdit}
                  onDelete={handleDeleteBook}
                  onView={handleView}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
};
