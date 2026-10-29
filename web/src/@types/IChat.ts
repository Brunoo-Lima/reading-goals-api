export interface IChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface IChatRequest {
  message: string;
  previousResponseId?: string;
}

export interface IChatResponse {
  responseId: string;
  message: string;
}

export interface IChatHistoryMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
  response_id?: string | null;
}
