import axios, { type AxiosRequestConfig } from 'axios';

interface QueueItem {
  resolve: () => void;
  reject: (error: unknown) => void;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api/v1',
  timeout: 10000,
  withCredentials: true, // continua essencial: manda e recebe cookies
});

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve();
  });
  failedQueue = [];
};

interface RetryConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest: RetryConfig = error.config;
    const requestUrl = originalRequest?.url ?? '';
    const isAuthRoute =
      requestUrl.includes('/auth') || requestUrl.includes('/refresh-token');

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      !isAuthRoute
    ) {
      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest)) // cookie novo já está no navegador
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post('/auth/refresh-token');

        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        return Promise.reject(
          new Error('Sessão expirada. Faça login novamente.'),
        );
      } finally {
        isRefreshing = false;
      }
    }

    const message: string =
      error.response?.data?.message ?? 'Ocorreu um erro. Tente novamente.';
    return Promise.reject(new Error(message));
  },
);

export default api;
