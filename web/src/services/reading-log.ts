import type { ICreateReadingLog, IReadingLog } from '@/@types/IReadingLog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';
import api from './api';

export const getReadingLogs = async (): Promise<IReadingLog[]> => {
  const { data } = await api.get('/reading-logs');
  return data;
};

export const getReadingLogsByBookId = async (
  bookId: string,
): Promise<IReadingLog[]> => {
  const { data } = await api.get('/reading-logs/book', {
    params: { bookId },
  });
  return data;
};

export const registerReadingLog = async (
  bookId: string,
  readingLog: ICreateReadingLog,
): Promise<IReadingLog> => {
  const { data } = await api.post('/reading-logs', readingLog, {
    params: { bookId },
  });
  return data;
};

export const useRegisterReadingLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['registerReadingLog'],
    mutationFn: ({
      bookId,
      readingLog,
    }: {
      bookId: string;
      readingLog: ICreateReadingLog;
    }) => registerReadingLog(bookId, readingLog),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['reading-streak'] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Leitura registrada com sucesso!');
    },
    onError: (error: AxiosError) => {
      toast.error(error.message || 'Erro ao registrar leitura.');
    },
  });
};
