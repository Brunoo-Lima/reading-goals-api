import api from './api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const login = async (email: string, password: string) => {
  const { data } = await api.post('/auth/login', { email, password });

  return data;
};

export const useUserLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (user: { email: string; password: string }) => {
      return login(user.email, user.password);
    },
  });
};

interface IForgotPasswordResponse {
  token: string;
}

export const forgotPassword = async (email: string, securityKey: string) => {
  const { data } = await api.post<IForgotPasswordResponse>(
    '/auth/forgot-password',
    { email, securityKey },
  );

  return data;
};

export const useForgotPassword = () =>
  useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: ({
      email,
      securityKey,
    }: {
      email: string;
      securityKey: string;
    }) => forgotPassword(email, securityKey),
    onError: (error: Error) => toast.error(error.message),
  });

export const resetPassword = async (token: string, password: string) => {
  const { data } = await api.post('/auth/reset-password', { token, password });

  return data;
};

export const useResetPassword = () =>
  useMutation({
    mutationKey: ['reset-password'],
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      resetPassword(token, password),
    onError: (error: Error) => toast.error(error.message),
  });
