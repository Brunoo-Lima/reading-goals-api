import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/context/auth-context';
import { BooksProvider } from '@/context/books-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const Providers = ({ children }: React.PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BooksProvider>{children}</BooksProvider>
      </AuthProvider>
      <Toaster />
    </QueryClientProvider>
  );
};
