import type { IUserRequest } from '@/@types/IUser';
import { useUserLogin } from '@/services/auth';
import { getUser } from '@/services/user';
import { refreshAuthSession } from '@/services/api';
import { createContext, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface IAuthContextProps {
  user: IUserRequest | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  loginService: (email: string, password: string) => Promise<void>;
  logOut: () => void;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<IAuthContextProps | undefined>(
  undefined,
);

interface IAuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IUserRequest | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const login = useUserLogin();

  const refreshUser = useCallback(async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      setUser(null);
      return;
    }

    try {
      await refreshAuthSession(refreshToken);
    } catch (error) {
      console.error(error);
      setUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/');
      return;
    }

    const userData = await getUser();

    if (userData) {
      setUser((previousUser) => {
        if (!previousUser) {
          return userData;
        }

        return {
          ...previousUser,
          ...userData,
        };
      });
    }
  }, [navigate]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        await refreshUser();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getUserData();
  }, [refreshUser]);

  async function loginService(email: string, password: string) {
    setIsLoading(true);

    try {
      await login.mutateAsync(
        { email, password },
        {
          onSuccess: (user) => {
            localStorage.setItem('accessToken', user.tokens.accessToken);
            localStorage.setItem('refreshToken', user.tokens.refreshToken);

            setUser(user);
            toast.success('Login realizado com sucesso!');
            navigate('/geral');
          },
        },
      );
    } catch (error: any) {
      const message = error.message || 'Erro ao fazer login.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

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
    refreshUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
