import type { ICreateGoal, ICreateGoalProgress } from '@/@types/IGoal';
import api from './api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import { getErrorMessage } from '@/utils/get-error-message';

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
    onError: (error: AxiosError) => {
      toast.error(getErrorMessage(error.message));
    },
  });
};

export const deleteGoal = async (id: string) => {
  await api.delete(`/goals/${id}`);
};

export const useDeleteGoal = () => {
  return useMutation({
    mutationKey: ['deleteGoal'],
    mutationFn: (id: string) => {
      return deleteGoal(id);
    },
    onError: (error: AxiosError) => {
      toast.error(getErrorMessage(error.message));
    },
  });
};

export const registerProgressGoal = async (
  goalId: string,
  goalProgressData: ICreateGoalProgress,
) => {
  const { data } = await api.post(
    `/goals/${goalId}/progress`,
    goalProgressData,
  );
  return data;
};

export const useRegisterProgressGoal = () => {
  return useMutation({
    mutationKey: ['registerProgressGoal'],
    mutationFn: ({
      goalId,
      goalProgressData,
    }: {
      goalId: string;
      goalProgressData: ICreateGoalProgress;
    }) => {
      return registerProgressGoal(goalId, goalProgressData);
    },
    onError: (error: AxiosError) => {
      toast.error(getErrorMessage(error.message));
    },
  });
};
