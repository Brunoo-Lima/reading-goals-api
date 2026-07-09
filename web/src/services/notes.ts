import type { ICreateNote } from '@/@types/INote';
import api from './api';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

export const createNote = async (note: ICreateNote, bookId: string) => {
  const { data } = await api.post(`/notes/${bookId}`, note);

  return data;
};

export const useCreateNote = () => {
  return useMutation({
    mutationKey: ['createNote'],
    mutationFn: ({ note, bookId }: { note: ICreateNote; bookId: string }) => {
      return createNote(note, bookId);
    },
    onSuccess: () => {
      toast.success('Nota criada com sucesso!');
    },
    onError: (error: AxiosError) => {
      const message = error.message || 'Erro ao criar nota.';
      toast.error(message);
    },
  });
};

export const getNotesByBookId = async (bookId: string) => {
  const { data } = await api.get(`/notes?bookId=${bookId}`);
  return data;
};
