import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageContainer } from '@/components/ui/page-container';
import {
  ContentPage,
  DescriptionPage,
  HeaderPage,
  TitlePage,
} from '@/components/ui/title-page';

export function AccountPage() {
  return (
    <PageContainer>
      <HeaderPage>
        <ContentPage>
          <TitlePage>Minha Conta</TitlePage>
          <DescriptionPage>Informações da conta</DescriptionPage>
        </ContentPage>
      </HeaderPage>

      {/* Actions */}
      <Card className="p-6 bg-card border-border/50">
        <h3 className="font-semibold text-foreground mb-4">Acoes</h3>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            Exportar dados
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Configuracoes
          </Button>
        </div>
      </Card>
    </PageContainer>
  );
}
