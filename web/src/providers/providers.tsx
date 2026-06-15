import { BooksProvider } from '@/context/books-context';
import { AuthProvider } from '../context/auth-context';

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <AuthProvider>
        <BooksProvider>{children}</BooksProvider>
      </AuthProvider>
    </>
  );
};
