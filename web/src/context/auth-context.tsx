import type { IUserRequest } from '@/@types/IUser';
import { messages } from '@/constants/messages';
import { useUserLogin } from '@/services/auth';
import { getUser } from '@/services/user';
import { getErrorMessage } from '@/utils/get-error-message';
import { createContext, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface IAuthContextProps {
  user: IUserRequest | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  loginService: (
    email: string,
    password: string,
    rememberMe: boolean,
  ) => Promise<void>;
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
    // const refreshToken = localStorage.getItem('refreshToken');

    // if (!refreshToken) {
    //   setUser(null);
    //   return;
    // }

    try {
      // await refreshAuthSession(refreshToken);

      const userData = await getUser();
      setUser(userData);
    } catch (error) {
      console.error(error);
      setUser(null);
      navigate('/');
      return;
    }

    // const userData = await getUser();

    // if (userData) {
    //   setUser((previousUser) => {
    //     if (!previousUser) {
    //       return userData;
    //     }

    //     return {
    //       ...previousUser,
    //       ...userData,
    //     };
    //   });
    // }
  }, []);

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

  async function loginService(
    email: string,
    password: string,
    rememberMe: boolean,
  ) {
    setIsLoading(true);

    try {
      await login.mutateAsync(
        { email, password, rememberMe },
        {
          onSuccess: (user) => {
            setUser(user);
            toast.success(messages.success.login);
            navigate('/geral');
          },
        },
      );
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  const logOut = () => {
    setUser(null);
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
