import type { ICreateBook } from '@/@types/IBook';
import api from './api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';

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

export const useGetBooks = (enabled = true) => {
  return useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
    enabled,
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
      toast.success('Livro deletado com sucesso!');
    },
    onError: (error: AxiosError) => {
      toast.error(error.message || 'Erro ao atualizar livro.');
    },
  });
};

export const updateBook = async (id: string, book: ICreateBook) => {
  const { data } = await api.patch(`/books/${id}`, book);
  return data;
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateBook'],
    mutationFn: (book: { id: string; book: ICreateBook }) => {
      return updateBook(book.id, book.book);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Livro atualizado com sucesso!');
    },

    onError: (error: AxiosError) => {
      const message = error.message || 'Erro ao atualizar livro.';
      toast.error(message);
    },
  });
};
