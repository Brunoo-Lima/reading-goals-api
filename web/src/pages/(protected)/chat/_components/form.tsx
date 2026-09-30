import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendIcon } from 'lucide-react';

interface IFormProps {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  handleSend: () => void;
}

export const Form = ({
  input,
  setInput,
  isLoading,
  handleSend,
}: IFormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSend();
      }}
      className="flex gap-2"
    >
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite sua mensagem..."
        className="flex-1"
        disabled={isLoading}
      />
      <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
        <SendIcon className="h-4 w-4" />
      </Button>
    </form>
  );
};
