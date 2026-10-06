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
import { FormBook } from './_components/forms/form-book';
import { PageMeta } from '@/components/page-meta';
import { useBookForm } from '@/hooks/use-book-form';

export function BooksPage() {
  const { showForm, editingBook, createBook, editBook, setShowForm } =
    useBookForm();

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

          <Button onClick={createBook} className="cursor-pointer self-end">
            <PlusIcon className="size-4" />
            <p
            // className="hidden sm:inline"
            >
              Novo Livro
            </p>
          </Button>
        </HeaderPage>

        <TabsComponent onEditBook={editBook} onAddBook={createBook} />

        <FormBook
          open={showForm}
          onOpenChange={setShowForm}
          initialData={editingBook ?? null}
        />
      </PageContainer>
    </>
  );
}
