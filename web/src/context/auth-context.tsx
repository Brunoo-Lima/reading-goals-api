import type { IUserRequest } from '@/@types/IUser';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IAuthContextProps {
  isLoading: boolean;
  user: IUserRequest | null;
  isAuthenticated: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  loginService: (email: string, password: string) => Promise<void>;
  logOut: () => void;
}

export const AuthContext = createContext<IAuthContextProps | undefined>(
  undefined,
);

interface IAuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUserRequest | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      const user = JSON.parse(storedUser);
      setUser({
        ...user,
        name: 'John Doe',
      });
    }
    setIsLoading(false);
  }, []);

  async function loginService(email: string, password: string) {
    setIsLoading(true);

    try {
      if (email && password) {
        localStorage.setItem('token', 'token');
        localStorage.setItem('user', JSON.stringify({ email, password }));
        setUser({ email, password, name: 'John Doe' });
      }
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  }

  const logOut = () => {
    setUser(null);
    setIsLoading(false);

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/');
  };

  const contextValue = {
    isLoading,
    user,
    isAuthenticated: !!user,
    open,
    setOpen,
    loginService,
    logOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
