export type ChatMessageRole = 'user' | 'assistant';

export interface IChatRepository {
  clear(userId: string): Promise<unknown>;
  list(userId: string): Promise<
    Array<{
      id: string;
      role: string;
      content: string;
      response_id: string | null;
      created_at: Date;
    }>
  >;
  create(
    userId: string,
    role: ChatMessageRole,
    content: string,
    responseId?: string,
  ): Promise<unknown>;
}
