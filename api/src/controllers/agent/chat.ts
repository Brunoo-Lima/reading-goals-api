import type { Request } from 'express';
import { badRequest, ok, serverError } from '../helpers';
import { chatSchema } from '../../schemas/chat';
import type { IAgentUseCase } from '../../interfaces/use-cases';

export class ChatAgentController {
  private agentUseCase: IAgentUseCase;

  constructor(agentUseCase: IAgentUseCase) {
    this.agentUseCase = agentUseCase;
  }

  async execute(request: Request) {
    const parsed = chatSchema.safeParse(request.body);

    if (!parsed.success) return badRequest({ message: 'message is required' });

    try {
      const result = await this.agentUseCase.execute(
        request.userId as string,
        parsed.data,
      );
      return ok(result);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
