import { IdGeneratorAdapter } from '../../adapters';
import {
  PostgresCreateBookRepository,
  PostgresGetBookByIdRepository,
  PostgresGetBookByTitleRepository,
  PostgresGetMyBooksRepository,
  PostgresGetUserByIdRepository,
  PostgresUpdateBookRepository,
} from '../../repositories/postgres';
import {
  AgentUseCase,
  CreateBookUseCase,
  GetMyBooksUseCase,
  UpdateBookUseCase,
} from '../../use-cases';
import { ChatAgentController } from '../../controllers';
import { aiClient } from '../../lib/ai-client';

export const makeChatAgentController = () => {
  const createBookRepository = new PostgresCreateBookRepository();
  const getBookByTitleRepository = new PostgresGetBookByTitleRepository();
  const idGeneratorAdapter = new IdGeneratorAdapter();

  const createBookUseCase = new CreateBookUseCase(
    createBookRepository,
    getBookByTitleRepository,
    idGeneratorAdapter,
  );

  const getMyBooksRepository = new PostgresGetMyBooksRepository();
  const getUserByIdRepository = new PostgresGetUserByIdRepository();

  const getMyBooksUseCase = new GetMyBooksUseCase(
    getMyBooksRepository,
    getUserByIdRepository,
  );

  const updateBookRepository = new PostgresUpdateBookRepository();
  const getBookByIdRepository = new PostgresGetBookByIdRepository();

  const updateBookUseCase = new UpdateBookUseCase(
    updateBookRepository,
    getBookByIdRepository,
    getBookByTitleRepository,
  );

  const agentUseCase = new AgentUseCase(
    createBookUseCase,
    getMyBooksUseCase,
    updateBookUseCase,
    aiClient,
  );

  const chatAgentController = new ChatAgentController(agentUseCase);

  return chatAgentController;
};
