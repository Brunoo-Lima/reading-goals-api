import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { RotateCcwIcon } from 'lucide-react';

interface IAlertNewConversationProps {
  isLoading: boolean;
  onClear: () => void;
}

export const AlertNewConversation = ({
  isLoading,
  onClear,
}: IAlertNewConversationProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" disabled={isLoading}>
          <RotateCcwIcon className="mr-2 h-4 w-4" /> Nova conversa
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Iniciar uma nova conversa?</AlertDialogTitle>
          <AlertDialogDescription>
            O histórico atual será apagado permanentemente e o contexto do
            assistente será reiniciado.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onClear}>
            Apagar e continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
