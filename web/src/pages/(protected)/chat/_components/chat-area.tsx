import type { IChatMessage } from '@/@types/IChat';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useRef, useState } from 'react';
import {
  clearChatHistory,
  getChatHistory,
  sendChatMessage,
} from '@/services/chat';
import { Messages } from './messages';
import { Suggestions } from './suggestions';
import { Form } from './form';
import { AlertNewConversation } from './alert-new-conversation';

export const ChatArea = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previousResponseId, setPreviousResponseId] = useState<string>();
  const [lastActivityAt, setLastActivityAt] = useState(() => Date.now());
  const [, setClock] = useState(() => Date.now());
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<IChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        'Ola! Sou seu assistente de leitura. Posso ajudar voce a:\n\n- Recomendar livros baseados nos seus gostos\n- Adicionar novos livros a sua estante\n- Atualizar o progresso dos seus livros\n- Ver estatisticas e progresso\n\nComo posso ajudar hoje?',
      timestamp: new Date().toISOString(),
    },
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    getChatHistory()
      .then((history) => {
        if (!history.length) return;
        setMessages(
          history.map((item) => ({
            id: item.id,
            role: item.role,
            content: item.content,
            timestamp: item.created_at,
          })),
        );
        const lastResponse = [...history]
          .reverse()
          .find((item) => item.response_id);
        if (lastResponse?.response_id)
          setPreviousResponseId(lastResponse.response_id);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setClock(Date.now()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: IChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage({
        message: input,
        ...(Date.now() - lastActivityAt < 30 * 60 * 1000 && previousResponseId
          ? { previousResponseId }
          : {}),
      });

      setPreviousResponseId(response.responseId);
      setLastActivityAt(Date.now());
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.message,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content:
            error instanceof Error
              ? error.message
              : 'Não foi possível responder agora.',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleClear = async () => {
    await clearChatHistory();
    setMessages([]);
    setPreviousResponseId(undefined);
    setLastActivityAt(Date.now());
  };

  return (
    <Card className="flex-1 gap-0 flex flex-col bg-card border-border/50 overflow-hidden">
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-2">
        <span className="text-sm text-muted-foreground">Conversa</span>
        <AlertNewConversation isLoading={isLoading} onClear={handleClear} />
      </div>

      <ScrollArea className="flex-1 p-4 h-[calc(100%-96px)]" ref={scrollRef}>
        <Messages messages={messages} isLoading={isLoading} />
      </ScrollArea>

      {(messages.length <= 2 ||
        Date.now() - lastActivityAt >= 30 * 60 * 1000) && (
        <Suggestions onSuggestion={handleSuggestion} />
      )}

      <div className="p-4 border-t border-border/50 ">
        <Form
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          handleSend={handleSend}
        />
      </div>
    </Card>
  );
};
