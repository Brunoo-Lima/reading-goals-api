import type { Request } from 'express';
import { badRequest, ok, serverError } from '../helpers';
import { chatSchema } from '../../schemas/chat';
import type { IChatUseCase } from '../../interfaces/use-cases';

export class ChatAgentController {
  private chatUseCase: IChatUseCase;

  constructor(chatUseCase: IChatUseCase) {
    this.chatUseCase = chatUseCase;
  }

  async execute(request: Request) {
    const parsed = chatSchema.safeParse(request.body);

    if (!parsed.success) return badRequest({ message: 'message is required' });

    try {
      const result = await this.chatUseCase.execute(
        request.userId as string,
        parsed.data,
      );

      return ok(result);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }

  async history(request: Request) {
    const messages = await this.chatUseCase.history(request.userId as string);
    return ok({ messages });
  }

  async clear(request: Request) {
    await this.chatUseCase.clear(request.userId as string);
    return ok({ message: 'Chat history cleared' });
  }
}
