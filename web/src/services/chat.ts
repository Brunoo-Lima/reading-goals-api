import type {
  IChatHistoryMessage,
  IChatRequest,
  IChatResponse,
} from '@/@types/IChat';
import api from './api';

export const getChatHistory = async () => {
  const { data } = await api.get<{ messages: IChatHistoryMessage[] }>(
    '/chat/history',
  );
  return data.messages;
};

export const clearChatHistory = async () => {
  await api.delete('/chat/history');
};

export const sendChatMessage = async (payload: IChatRequest) => {
  const { data } = await api.post<IChatResponse>('/chat/agent', payload, {
    timeout: 60_000,
  });
  return data;
};
