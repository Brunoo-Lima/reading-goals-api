import { BooksProvider } from '@/context/books-context';
import { AuthProvider } from '../context/auth-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const Providers = ({ children }: React.PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BooksProvider>{children}</BooksProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
