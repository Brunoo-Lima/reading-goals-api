import { useQuery } from '@tanstack/react-query';
import api from './api';

export const searchBooksPerTitle = async (title: string) => {
  const { data } = await api.get('/books/covers/search', { params: { title } });
  const firstCover = data[0] ?? null;

  return {
    coverId: firstCover?.cover_id ?? null,
    coverUrl: firstCover?.cover_url ?? null,
  };
};

export const useSearchBooksPerTitle = (title: string) =>
  useQuery({
    queryKey: ['searchBooksPerTitle', title],
    queryFn: () => searchBooksPerTitle(title),
    enabled: title.trim().length >= 3,
    staleTime: 1000 * 60 * 5,
  });
