import type { IAgentInput } from '../../@types/IAgentInput';
import type { IChatRepository } from '../../interfaces/repositories';
import type { IAgentUseCase } from '../../interfaces/use-cases';

export class ChatUseCase {
  constructor(
    private readonly agentUseCase: IAgentUseCase,
    private readonly chatRepository: IChatRepository,
  ) {}

  async execute(userId: string, input: IAgentInput) {
    await this.chatRepository.create(userId, 'user', input.message);

    const result = await this.agentUseCase.execute(userId, input);

    await this.chatRepository.create(
      userId,
      'assistant',
      result.message,
      result.responseId,
    );
    return result;
  }

  async history(userId: string) {
    return this.chatRepository.list(userId);
  }

  async clear(userId: string) {
    await this.chatRepository.clear(userId);
  }
}
