import type { IStreak } from '@/@types/IStreak';
import api from './api';

export const getStreak = async (): Promise<IStreak> => {
  const { data } = await api.get('/reading-logs/streak');
  return data;
};
