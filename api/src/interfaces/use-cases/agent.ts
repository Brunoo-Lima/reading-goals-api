import type { IAgentInput } from '../../@types/IAgentInput';

export interface IAgentUseCase {
  execute(
    userId: string,
    input: IAgentInput,
  ): Promise<{
    responseId: string;
    message: string;
  }>;
}
