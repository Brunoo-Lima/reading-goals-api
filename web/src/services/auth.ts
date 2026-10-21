import { getErrorMessage } from '@/utils/get-error-message';
import api from './api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { ApiError } from '@/@types/IApiErrorResponse';

export const login = async (
  email: string,
  password: string,
  rememberMe: boolean,
) => {
  const { data } = await api.post('/auth/login', {
    email,
    password,
    rememberMe,
  });
  return data;
};

export const useUserLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (user: {
      email: string;
      password: string;
      rememberMe: boolean;
    }) => {
      return login(user.email, user.password, user.rememberMe);
    },
  });
};

export const logOut = async () => {
  const { data } = await api.post('/auth/logout');
  return data;
};

export const useUserLogOut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () => logOut(),
    onSuccess: () => {
      queryClient.clear();
    },
    onError: (error: ApiError) => {
      toast.error(getErrorMessage(error));
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
    onError: (error: Error) => toast.error(getErrorMessage(error)),
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
    onError: (error: Error) => toast.error(getErrorMessage(error)),
  });
