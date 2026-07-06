import { useMutation } from '@tanstack/react-query';
import api from './api';
import type { IUser } from '@/@types/IUser';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

export const getUser = async () => {
  const { data } = await api.get('/users/me', {
    // params: {
    //   userId,
    // },
  });

  return data;
};

// export const useGetUser = () => {
//   return useMutation({
//     mutationKey: ['getUser'],
//     mutationFn: (userId: string) => {
//       return getUser(userId);
//     },
//   });
// };

export const createUser = async (user: IUser) => {
  const { data } = await api.post('/users', user);
  return data;
};

export const useCreateUser = () => {
  return useMutation({
    mutationKey: ['signup'],
    mutationFn: (user: IUser) => {
      return createUser(user);
    },
    onSuccess: (createdUser) => {
      const { accessToken, refreshToken } = createdUser.tokens;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      toast.success('Usuário criado com sucesso!');
    },
    onError: (error: AxiosError) => {
      const message = error.message || 'Erro ao criar usuário.';
      toast.error(message);
    },
  });
};
