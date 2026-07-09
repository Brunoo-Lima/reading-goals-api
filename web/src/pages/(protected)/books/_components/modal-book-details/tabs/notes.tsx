import type { INote } from '@/@types/INote';
import { Button } from '@/components/ui/button';
import { PencilIcon, Trash2Icon } from 'lucide-react';

interface INotesProps {
  note: INote | null;
  setShowFormNote: (show: boolean) => void;
  setNote: React.Dispatch<React.SetStateAction<INote | null>>;
}

export const Notes = ({ note, setShowFormNote, setNote }: INotesProps) => {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex flex-col gap-2">
        <p>Nota: </p>
        <span>{note?.content}</span>

        <strong>Número da página: {note?.page_number}</strong>
      </div>

      <p className="mt-4 text-muted-foreground">
        Nota cadastrada em{' '}
        {note && new Date(note.updated_at).toLocaleDateString('pt-BR')}
      </p>

      <div className="flex items-center gap-2 mt-4">
        <Button
          variant="default"
          onClick={() => {
            setShowFormNote(true);
            setNote(note);
          }}
        >
          <PencilIcon className="h-4 w-4 mr-2" />
          Editar
        </Button>

        <Button variant="destructive">
          <Trash2Icon className="h-4 w-4 mr-2" />
          Excluir
        </Button>
      </div>
    </div>
  );
};
