import type { IChatMessage } from '@/@types/IChat';
import { BookOpenTextIcon, BotIcon, UserIcon } from 'lucide-react';

interface IMessagesProps {
  messages: IChatMessage[];
  isLoading: boolean;
}

export const Messages = ({ messages, isLoading }: IMessagesProps) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-3 ${
            message.role === 'user' ? 'flex-row-reverse' : ''
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              message.role === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary'
            }`}
          >
            {message.role === 'user' ? (
              <UserIcon className="h-4 w-4" />
            ) : (
              <BotIcon className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
          <div
            className={`max-w-[80%] p-3 rounded-2xl ${
              message.role === 'user'
                ? 'bg-primary text-primary-foreground rounded-br-sm'
                : 'bg-secondary text-foreground rounded-bl-sm'
            }`}
          >
            <p className="whitespace-pre-line text-sm">{message.content}</p>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <BookOpenTextIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="bg-secondary p-3 rounded-2xl rounded-bl-sm">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-100" />
              <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-200" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
