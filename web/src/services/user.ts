import { useMutation } from '@tanstack/react-query';
import api from './api';
import type { ICreateUser, IUpdateUser } from '@/@types/IUser';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/get-error-message';
import { userMessage } from '@/constants/user';

export const getUser = async () => {
  const { data } = await api.get('/users/me');
  return data;
};

export const createUser = async (user: ICreateUser) => {
  const { data } = await api.post('/users', user);
  return data;
};

export const useCreateUser = () => {
  return useMutation({
    mutationKey: ['signup'],
    mutationFn: (user: ICreateUser) => {
      return createUser(user);
    },
    onSuccess: () => {
      toast.success(userMessage.success.created);
    },
    onError: (error: AxiosError) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const updateUser = async (user: IUpdateUser) => {
  const { data } = await api.patch('/users/me', user);
  return data;
};

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ['updateUser'],
    mutationFn: (user: IUpdateUser) => {
      return updateUser(user);
    },
    onSuccess: () => {
      toast.success(userMessage.success.updated);
    },
    onError: (error: AxiosError) => {
      toast.error(getErrorMessage(error.message));
    },
  });
};
