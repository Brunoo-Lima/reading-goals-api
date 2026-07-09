import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useEffect } from 'react';
import {
  noteFormSchema,
  type INoteFormSchema,
} from '@/schemas/note-form-schema';
import type { INote } from '@/@types/INote';
import { Textarea } from '@/components/ui/textarea';
import { useNotes } from '@/hooks/use-notes';

interface IFormNoteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: INote | null;
  bookId: string;
}

export const FormNote = ({
  open,
  onOpenChange,
  initialData,
  bookId,
}: IFormNoteProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<INoteFormSchema>({
    resolver: zodResolver(noteFormSchema as any),
    defaultValues: {
      content: '',
      page_number: 0,
    },
  });

  const { addNote, updateNote } = useNotes();

  useEffect(() => {
    reset({
      content: initialData?.content || '',
      page_number: initialData?.page_number || 0,
    });
  }, [initialData, reset]);

  const onSubmit = async (data: INoteFormSchema) => {
    const noteData = {
      ...data,
      page_number: data.page_number || 0,
    };

    try {
      if (initialData) {
        await updateNote(initialData.id, noteData, bookId);
      } else {
        await addNote(noteData, bookId);
      }

      onOpenChange(false);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  function handleCloseForm() {
    reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleCloseForm}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            {initialData ? 'Editar nota' : 'Adicionar nota'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field className="gap-2">
            <FieldLabel>Conteúdo</FieldLabel>
            <Textarea placeholder="Conteúdo" {...register('content')} />
            {errors.content && (
              <FieldError className="text-red-500">
                {errors.content.message}
              </FieldError>
            )}
          </Field>

          <Field className="gap-2">
            <FieldLabel>Número da página</FieldLabel>
            <Input
              type="number"
              placeholder="Número da página"
              {...register('page_number', { valueAsNumber: true })}
            />
            {errors.page_number && (
              <FieldError className="text-red-500">
                {errors.page_number.message}
              </FieldError>
            )}
          </Field>

          <div className="flex gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1 cursor-pointer"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 cursor-pointer">
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
