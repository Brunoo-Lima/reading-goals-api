import type { IAgentInput } from '../../@types/IAgentInput';
import type { IBook } from '../../@types/IBook';
import type {
  ICreateBookUseCase,
  IGetMyBooksUseCase,
  IUpdateBookUseCase,
} from '../../interfaces/use-cases';
import { aiClient, aiModel } from '../../lib/ai-client';
import { tools } from '../../utils/tools';

const instructions = `Você é o assistente de leitura do Bbookly. Responda em português, seja objetivo e amigável.
Você pode recomendar livros, consultar o acervo do usuário, cadastrar livros e registrar avaliações.
Nunca invente livros do acervo nem diga que uma alteração foi feita sem executar a ferramenta.
Para recomendações de obras novas, deixe claro que são sugestões. Antes de cadastrar, confirme dados faltantes.
Não exponha IDs internos, segredos ou dados de outros usuários.`;

export class AgentUseCase {
  constructor(
    private readonly createBookUseCase: ICreateBookUseCase,
    private readonly getMyBooksUseCase: IGetMyBooksUseCase,
    private readonly updateBookUseCase: IUpdateBookUseCase,
    private readonly client = aiClient,
  ) {}

  async execute(userId: string, input: IAgentInput) {
    if (!process.env.OPENAI_API_KEY)
      throw new Error('OPENAI_API_KEY is not configured');

    const createResponse = (
      requestInput:
        | string
        | Array<{
            type: 'function_call_output';
            call_id: string;
            output: string;
          }>,
      previousResponseId?: string,
    ) =>
      this.client.responses.create({
        model: aiModel,
        instructions,
        tools,
        input: requestInput,
        ...(previousResponseId
          ? { previous_response_id: previousResponseId }
          : {}),
      });

    let response = await createResponse(
      input.message,
      input.previousResponseId,
    );

    for (let round = 0; round < 4; round += 1) {
      const calls = response.output.filter(
        (item) => item.type === 'function_call',
      );
      if (calls.length === 0)
        return { responseId: response.id, message: response.output_text };

      const outputs = [];
      for (const call of calls) {
        const args = JSON.parse(call.arguments) as Record<string, unknown>;
        let result: unknown;
        if (call.name === 'list_my_books') {
          result = await this.getMyBooksUseCase.execute(
            userId,
            typeof args.search === 'string' ? args.search : undefined,
            undefined,
            typeof args.status === 'string'
              ? (args.status as never)
              : undefined,
          );
        } else if (call.name === 'add_book') {
          result = await this.createBookUseCase.execute({
            user_id: userId,
            title: String(args.title),
            author: String(args.author),
            genre: args.genre as string[],
            total_pages: Number(args.total_pages),
            status: (args.status as never) ?? 'WISHLIST',
          } as unknown as IBook);
        } else if (call.name === 'update_book') {
          result = await this.updateBookUseCase.execute(
            String(args.book_id),
            userId,
            {
              ...(args.rating !== undefined
                ? { rating: Number(args.rating) }
                : {}),
              ...(args.status !== undefined
                ? { status: args.status as never }
                : {}),
              ...(args.current_page !== undefined
                ? { current_page: Number(args.current_page) }
                : {}),
            } as never,
          );
        } else result = { error: 'UNKNOWN_TOOL' };
        outputs.push({
          type: 'function_call_output' as const,
          call_id: call.call_id,
          output: JSON.stringify(result),
        });
      }
      response = await createResponse(outputs, response.id);
    }
    throw new Error('Agent tool call limit exceeded');
  }
}
