import type { IAgentInput } from '../../@types/IAgentInput';

export interface IChatUseCase {
  execute(
    userId: string,
    input: IAgentInput,
  ): Promise<{
    responseId: string;
    message: string;
  }>;
  history(userId: string): Promise<unknown[]>;
  clear(userId: string): Promise<void>;
}
