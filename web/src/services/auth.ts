import api from './api';
import { useMutation } from '@tanstack/react-query';

export const login = async (email: string, password: string) => {
  const { data } = await api.post('/auth/login', { email, password });

  return data;
};

export const useUserLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (user: { email: string; password: string }) => {
      return login(user.email, user.password);
    },
  });
};
