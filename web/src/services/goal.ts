import type { ICreateGoal } from '@/@types/IGoal';
import api from './api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';

export const getGoals = async () => {
  const { data } = await api.get('/goals');
  return data;
};

export const createGoal = async (data: ICreateGoal, bookId?: string) => {
  const { data: goal } = await api.post(
    `/goals${bookId ? `?bookId=${bookId}` : ''}`,
    data,
  );
  return goal;
};

export const useCreateGoal = () => {
  return useMutation({
    mutationKey: ['createGoal'],
    mutationFn: ({ data, bookId }: { data: ICreateGoal; bookId?: string }) => {
      return createGoal(data, bookId);
    },
    onSuccess: () => {
      toast.success('Meta criada com sucesso!');
    },
    onError: (error: AxiosError) => {
      const message = error.message || 'Erro ao criar meta.';
      toast.error(message);
    },
  });
};
