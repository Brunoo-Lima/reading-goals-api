import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { TabsComponent } from './_components/tabs-component';
import { useState } from 'react';
import { useBooks } from '@/hooks/use-books';
import type { IBook, StatusReading } from '@/@types/IBook';

export function BooksPage() {
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
    <section className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Meus Livros</h1>
          <p className="text-muted-foreground">
            Gerencie sua biblioteca pessoal
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingBook(null);
            setShowForm(true);
          }}
          className="gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Novo Livro</span>
        </Button>
      </div>

      {/* Books Section */}
      <TabsComponent
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onView={handleView}
        onEdit={handleEdit}
        onDeleteBook={handleDeleteBook}
        filteredBooks={filteredBooks}
      />

      {/* Book Form Modal */}
      {/* <BookForm
        open={showForm}
        onOpenChange={(open) => {
          setShowForm(open);
          if (!open) setEditingBook(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingBook || undefined}
      /> */}

      {/* Book Details Modal */}
      {/* <BookDetails
        book={viewingBook}
        open={!!viewingBook}
        onOpenChange={(open) => {
          if (!open) setViewingBook(null);
        }}
      /> */}
    </section>
  );
}
