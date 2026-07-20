import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { TabsComponent } from './_components/tabs-component';
import { PageContainer } from '@/components/ui/page-container';
import {
  ContentPage,
  DescriptionPage,
  HeaderPage,
  TitlePage,
} from '@/components/ui/title-page';
import { useState } from 'react';
import type { IBook } from '@/@types/IBook';
import { FormBook } from './_components/forms/form-book';
import { PageMeta } from '@/components/page-meta';

export function BooksPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<IBook | null>(null);

  const handleCreateBook = () => {
    setEditingBook(null);
    setShowForm(true);
  };

  const handleEditBook = (book: IBook) => {
    setEditingBook(book);
    setShowForm(true);
  };

  return (
    <>
      <PageMeta
        title="Meus Livros"
        description="Gerencie sua biblioteca pessoal"
      />

      <PageContainer>
        <HeaderPage>
          <ContentPage>
            <TitlePage>Meus Livros</TitlePage>
            <DescriptionPage>Gerencie sua biblioteca pessoal</DescriptionPage>
          </ContentPage>

          <Button onClick={handleCreateBook} className="gap-2 cursor-pointer">
            <PlusIcon className="size-5" />
            <p className="hidden sm:inline">Novo Livro</p>
          </Button>
        </HeaderPage>

        <TabsComponent
          onEditBook={handleEditBook}
          onAddBook={handleCreateBook}
        />

        <FormBook
          open={showForm}
          onOpenChange={setShowForm}
          initialData={editingBook ?? null}
        />
      </PageContainer>
    </>
  );
}
