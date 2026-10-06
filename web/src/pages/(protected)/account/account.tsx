import { PageMeta } from '@/components/page-meta';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageContainer } from '@/components/ui/page-container';
import {
  ContentPage,
  DescriptionPage,
  HeaderPage,
  TitlePage,
} from '@/components/ui/title-page';
import { useState } from 'react';
import { InfoUser } from './views/info-user';
import { ExportBook } from './views/export-book';
import { useBooks } from '@/hooks/use-books';

export function AccountPage() {
  const [actionView, setActionView] = useState<'export' | 'settings'>(
    'settings',
  );
  const { books } = useBooks();

  return (
    <>
      <PageMeta title="Minha Conta" description="Informações da conta" />

      <PageContainer>
        <HeaderPage>
          <ContentPage>
            <TitlePage>Minha Conta</TitlePage>
            <DescriptionPage>Informações da conta</DescriptionPage>
          </ContentPage>
        </HeaderPage>

        <Card className="p-6 bg-card border-border/50">
          <h3 className="font-semibold text-foreground mb-2">Ações</h3>

          <div className="space-y-2">
            <Button
              variant="outline"
              className={`w-full justify-start ${actionView === 'settings' ? 'bg-primary text-primary-foreground' : ''}`}
              onClick={() => setActionView('settings')}
            >
              Configurações
            </Button>
            <Button
              variant="outline"
              className={`w-full justify-start ${actionView === 'export' ? 'bg-primary text-primary-foreground' : ''}`}
              onClick={() => setActionView('export')}
            >
              Exportar livros
            </Button>
          </div>
        </Card>

        {actionView === 'settings' && <InfoUser />}
        {actionView === 'export' && <ExportBook books={books} />}
      </PageContainer>
    </>
  );
}
