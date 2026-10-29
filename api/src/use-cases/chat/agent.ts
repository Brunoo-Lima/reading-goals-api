import type { IAgentInput } from '../../@types/IAgentInput';
import type { IBook } from '../../@types/IBook';
import type {
  ICreateBookUseCase,
  IGetMyBooksUseCase,
  IUpdateBookUseCase,
} from '../../interfaces/use-cases';
import { aiClient, aiModel } from '../../lib/ai-client';
import { instructions } from '../../utils/instructions';
import { tools } from '../../utils/tools';
import type { Response } from 'openai/resources/responses/responses';

export class AgentUseCase {
  constructor(
    private readonly createBookUseCase: ICreateBookUseCase,
    private readonly getMyBooksUseCase: IGetMyBooksUseCase,
    private readonly updateBookUseCase: IUpdateBookUseCase,
    private readonly client = aiClient,
  ) {}

  private getResponseText(response: Response) {
    if (response.output_text?.trim()) return response.output_text;

    return response.output
      .filter((item) => item.type === 'message')
      .flatMap((item) => item.content)
      .filter((content) => content.type === 'output_text')
      .map((content) => content.text)
      .join('\n')
      .trim();
  }

  async execute(userId: string, input: IAgentInput) {
    if (!process.env.API_KEY) throw new Error('API_KEY is not configured');

    const createResponse = (
      requestInput:
        | string
        | Array<{
            type: 'function_call_output';
            call_id: string;
            output: string;
          }>,
      previousResponseId?: string,
    ): Promise<Response> =>
      this.client.responses.create({
        model: aiModel,
        instructions: instructions,
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
        return {
          responseId: response.id,
          message:
            this.getResponseText(response) ||
            'Não consegui gerar uma resposta agora. Tente novamente.',
        };

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
        } else if (call.name === 'get_reading_progress') {
          const books = await this.getMyBooksUseCase.execute(
            userId,
            typeof args.search === 'string' ? args.search : undefined,
          );
          result = books.map((book) => ({
            title: book.title,
            status: book.status,
            current_page: book.current_page ?? 0,
            total_pages: book.total_pages,
            percentage:
              book.total_pages > 0
                ? Math.round(
                    ((book.current_page ?? 0) / book.total_pages) * 100,
                  )
                : 0,
          }));
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
