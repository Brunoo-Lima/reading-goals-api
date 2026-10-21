import type { ICreateNote } from '@/@types/INote';
import api from './api';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/get-error-message';
import { noteMessage } from '@/constants/note';

export const createNote = async (note: ICreateNote, bookId: string) => {
  const { data } = await api.post(`/notes?bookId=${bookId}`, note);

  return data;
};

export const useCreateNote = () => {
  return useMutation({
    mutationKey: ['createNote'],
    mutationFn: ({ note, bookId }: { note: ICreateNote; bookId: string }) => {
      return createNote(note, bookId);
    },
    onSuccess: () => {
      toast.success(noteMessage.success.created);
    },
    onError: (error: AxiosError) => {
      toast.error(getErrorMessage(error.message));
    },
  });
};

export const getNotesByBookId = async (bookId: string) => {
  const { data } = await api.get(`/notes?bookId=${bookId}`);
  return data;
};

export const updateNote = async (
  note: ICreateNote,
  noteId: string,
  bookId: string,
) => {
  const { data } = await api.patch(`/notes/${noteId}?bookId=${bookId}`, note);
  return data;
};

export const useUpdateNote = () => {
  return useMutation({
    mutationKey: ['updateNote'],
    mutationFn: ({
      note,
      noteId,
      bookId,
    }: {
      note: ICreateNote;
      noteId: string;
      bookId: string;
    }) => {
      return updateNote(note, noteId, bookId);
    },
    onError: (error: AxiosError) => {
      toast.error(getErrorMessage(error.message));
    },
  });
};

export const deleteNote = async (noteId: string) => {
  const { data } = await api.delete(`/notes/${noteId}`);
  return data;
};

export const useDeleteNote = () => {
  return useMutation({
    mutationKey: ['deleteNote'],
    mutationFn: (noteId: string) => {
      return deleteNote(noteId);
    },
    onError: (error: AxiosError) => {
      toast.error(getErrorMessage(error.message));
    },
  });
};
