import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export const NotFoundPage = () => {
  return (
    <section className="w-full h-dvh">
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="flex items-center justify-center w-full max-w-md">
          <img
            src="/404-error.svg"
            alt="Página não encontrada"
            loading="lazy"
          />
        </div>

        <h1 className="text-2xl font-bold text-foreground">
          Página não encontrada
        </h1>
        <p className="text-muted-foreground">
          A página que você está procurando não existe ou foi removida.
        </p>

        <Button asChild>
          <Link to="/geral">Voltar para a página geral</Link>
        </Button>
      </div>
    </section>
  );
};
