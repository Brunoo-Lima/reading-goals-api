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

export function BooksPage() {
  return (
    <PageContainer>
      <HeaderPage>
        <ContentPage>
          <TitlePage>Meus Livros</TitlePage>
          <DescriptionPage>Gerencie sua biblioteca pessoal</DescriptionPage>
        </ContentPage>

        <Button
          onClick={() => {
            setEditingBook(null);
            setShowForm(true);
          }}
          className="gap-2 cursor-pointer"
        >
          <PlusIcon className="size-5" />
          <p className="hidden sm:inline">Novo Livro</p>
        </Button>
      </HeaderPage>

      {/* Books Section */}
      <TabsComponent />

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
    </PageContainer>
  );
}
