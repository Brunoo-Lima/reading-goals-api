import type { INote } from '@/@types/INote';
import { Button } from '@/components/ui/button';
import { PencilIcon, Trash2Icon } from 'lucide-react';

interface INotesProps {
  note: INote | null;
  setShowFormNote: (show: boolean) => void;
  setNote: React.Dispatch<React.SetStateAction<INote | null>>;
  setShowDeleteNote: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
}

export const Notes = ({
  note,
  setShowFormNote,
  setNote,
  setShowDeleteNote,
  index,
}: INotesProps) => {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex flex-col gap-2 pb-2 mb-2 border-b  border-gray-300">
        <b>Nota {index + 1}: </b>
        <p>{note?.content}</p>
      </div>

      <p>
        Número da página:{' '}
        <span className="font-semibold">{note?.page_number}</span>
      </p>

      <div className="flex flex-col mt-4 gap-y-1">
        <p className="text-muted-foreground">
          Nota cadastrada em{' '}
          {note && new Date(note.created_at).toLocaleDateString('pt-BR')}
        </p>

        <p className="text-muted-foreground">
          Nota atualizada em{' '}
          {note?.updated_at &&
            new Date(note.updated_at).toLocaleDateString('pt-BR')}
        </p>
      </div>

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

        <Button variant="destructive" onClick={() => setShowDeleteNote(true)}>
          <Trash2Icon className="h-4 w-4 mr-2" />
          Excluir
        </Button>
      </div>
    </div>
  );
};
