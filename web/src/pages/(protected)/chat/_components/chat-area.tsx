import type { IChatMessage } from '@/@types/IChat';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useBooks } from '@/hooks/use-books';
import { useEffect, useRef, useState } from 'react';
import { Messages } from './messages';
import { Suggestions } from './suggestions';
import { Form } from './form';

export const ChatArea = () => {
  const { books, completedBooks, readingBooks, toReadBooks } = useBooks();

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  const processMessage = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Check for book addition intent
    if (
      lowerMessage.includes('adicionar') ||
      lowerMessage.includes('novo livro')
    ) {
      return "Para adicionar um novo livro, me diga o titulo e o autor no formato:\n\n'Adicionar [Titulo] de [Autor]'\n\nOu voce pode ir ate a pagina de Livros e clicar no botao 'Novo Livro'.";
    }

    // Check for recommendation
    if (lowerMessage.includes('recomen') || lowerMessage.includes('sugest')) {
      const genres = [
        'fantasia',
        'ficcao',
        'romance',
        'terror',
        'misterio',
        'biografia',
      ];
      const genre = genres.find((g) => lowerMessage.includes(g));

      if (genre) {
        const recommendations: Record<string, string[]> = {
          fantasia: [
            'O Nome do Vento - Patrick Rothfuss',
            'Mistborn - Brandon Sanderson',
            'A Roda do Tempo - Robert Jordan',
          ],
          ficcao: [
            'O Processo - Franz Kafka',
            '1984 - George Orwell',
            'Admiravel Mundo Novo - Aldous Huxley',
          ],
          romance: [
            'Orgulho e Preconceito - Jane Austen',
            'O Morro dos Ventos Uivantes - Emily Bronte',
          ],
          terror: [
            'It - Stephen King',
            'O Exorcista - William Peter Blatty',
            'A Assombracao da Casa da Colina - Shirley Jackson',
          ],
          misterio: [
            'O Codigo Da Vinci - Dan Brown',
            'A Garota no Trem - Paula Hawkins',
          ],
          biografia: [
            'Steve Jobs - Walter Isaacson',
            'Eu Sou Malala - Malala Yousafzai',
          ],
        };
        return `Otimas recomendacoes de ${genre}:\n\n${recommendations[genre].map((b, i) => `${i + 1}. ${b}`).join('\n')}\n\nQuer que eu adicione algum desses a sua lista de 'Quero Ler'?`;
      }

      return 'Posso recomendar livros de varios generos! Me diga qual tipo voce prefere:\n\n- Fantasia\n- Ficcao Cientifica\n- Romance\n- Terror\n- Misterio\n- Biografia\n\nOu me conte sobre seus livros favoritos para eu fazer recomendacoes personalizadas!';
    }

    // Check for next book suggestion
    if (
      lowerMessage.includes('proximo') ||
      lowerMessage.includes('ler em seguida') ||
      lowerMessage.includes('qual ler')
    ) {
      if (toReadBooks.length > 0) {
        const randomBook =
          toReadBooks[Math.floor(Math.random() * toReadBooks.length)];
        return `Baseado na sua lista 'Quero Ler', sugiro: \n\n📖 "${randomBook.title}" de ${randomBook.author}\n\nQuer que eu marque esse livro como 'Lendo'?`;
      }
      return "Sua lista 'Quero Ler' esta vazia! Que tal adicionar alguns livros? Posso recomendar baseado nos seus gostos.";
    }

    // Check for update progress
    if (lowerMessage.includes('atualizar') || lowerMessage.includes('pagina')) {
      if (readingBooks.length > 0) {
        return `Voce esta lendo ${readingBooks.length} livro(s):\n\n${readingBooks.map((b) => `- "${b.title}" (pagina ${b.current_page || 0}/${b.total_pages || '?'})`).join('\n')}\n\nPara atualizar, me diga: 'Estou na pagina X de [Titulo]'`;
      }
      return "Voce nao tem nenhum livro marcado como 'Lendo' no momento. Que tal comecar um da sua lista?";
    }

    // Default response
    return 'Entendi! Posso ajudar voce com:\n\n1. Recomendacoes de livros\n2. Adicionar novos livros\n3. Ver seu progresso\n4. Atualizar livros que esta lendo\n\nO que voce gostaria de fazer?';
  };

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

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = processMessage(input);
    const assistantMessage: IChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <Card className="flex-1 gap-0 flex flex-col bg-card border-border/50 overflow-hidden">
      <ScrollArea className="flex-1 p-4 h-[calc(100%-96px)]" ref={scrollRef}>
        <Messages messages={messages} isLoading={isLoading} />
      </ScrollArea>

      {messages.length <= 2 && <Suggestions onSuggestion={handleSuggestion} />}

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
