import { useMutation } from '@tanstack/react-query';
import api from './api';
import type { ICreateUser, IUpdateUser } from '@/@types/IUser';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

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
      toast.success('Usuário criado com sucesso!');
    },
    onError: (error: AxiosError) => {
      const message = error.message || 'Erro ao criar usuário.';
      toast.error(message);
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
      toast.success('Usuário atualizado com sucesso!');
    },
    onError: (error: AxiosError) => {
      const message = error.message || 'Erro ao atualizar usuário.';
      toast.error(message);
    },
  });
};
