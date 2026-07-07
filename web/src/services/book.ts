import type { ICreateBook } from '@/@types/IBook';
import api from './api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';

export const createBook = async (book: ICreateBook) => {
  const { data } = await api.post('/books', book);

  return data;
};

export const useCreateBook = () => {
  return useMutation({
    mutationKey: ['createBook'],
    mutationFn: createBook,
    onSuccess: () => {
      toast.success('Livro criado com sucesso!');
    },
    onError: (error: AxiosError) => {
      const message = error.message || 'Erro ao criar livro.';
      toast.error(message);
    },
  });
};

export const getBooks = async () => {
  const { data } = await api.get('/books');
  return data;
};

export const useGetBooks = () => {
  return useMutation({
    mutationKey: ['getBooks'],
    mutationFn: getBooks,
  });
};

export const getBookById = async (id: string) => {
  const { data } = await api.get(`/books/${id}`);
  return data;
};

export const useGetBookById = () => {
  return useMutation({
    mutationKey: ['getBookById'],
    mutationFn: getBookById,
  });
};

export const deleteBook = async (id: string) => {
  const { data } = await api.delete(`/books/${id}`);
  return data;
};

export const useDeleteBook = () => {
  return useMutation({
    mutationKey: ['deleteBook'],
    mutationFn: deleteBook,
  });
};
