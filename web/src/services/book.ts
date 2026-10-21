import type { ICreateBook } from '@/@types/IBook';
import api from './api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import { getErrorMessage } from '@/utils/get-error-message';
import { bookMessage } from '@/constants/book';

export const createBook = async (book: ICreateBook) => {
  const { data } = await api.post('/books', book);
  return data;
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createBook'],
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success(bookMessage.success.created);
    },
    onError: (error: AxiosError) => {
      toast.error(getErrorMessage(error.message));
    },
  });
};

export const getBooks = async () => {
  const { data } = await api.get('/books');
  return data;
};

export const useGetBooks = (userId?: string) => {
  return useQuery({
    queryKey: ['books', userId],
    queryFn: getBooks,
    enabled: !!userId, // Busca os livros apenas se o userId for fornecido
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteBook'],
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success(bookMessage.success.deleted);
    },
    onError: (error: AxiosError) => {
      toast.error(getErrorMessage(error.message));
    },
  });
};

export const updateBook = async (id: string, book: Partial<ICreateBook>) => {
  const { data } = await api.patch(`/books/${id}`, book);
  return data;
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateBook'],
    mutationFn: (book: { id: string; book: Partial<ICreateBook> }) => {
      return updateBook(book.id, book.book);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success(bookMessage.success.updated);
    },
    onError: (error: AxiosError) => {
      toast.error(getErrorMessage(error.message));
    },
  });
};
