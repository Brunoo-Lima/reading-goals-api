import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { useEffect } from 'react';
import {
  noteFormSchema,
  type INoteFormSchema,
} from '@/schemas/note-form-schema';
import type { INote } from '@/@types/INote';
import { Textarea } from '@/components/ui/textarea';
import { useNotes } from '@/hooks/use-notes';
import { toast } from 'sonner';

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
    control,
    reset,
  } = useForm<INoteFormSchema>({
    resolver: zodResolver(noteFormSchema as any),
    defaultValues: {
      content: '',
      rating: '0',
      page_number: 0,
    },
  });

  const { addNote } = useNotes();

  useEffect(() => {
    reset({
      content: initialData?.content || '',
      rating: initialData?.rating.toString() || '0',
      page_number: initialData?.page_number || 0,
    });
  }, [initialData, reset]);

  const onSubmit = async (data: INoteFormSchema) => {
    try {
      addNote(
        {
          content: data.content,
          rating: Number(data.rating) || 0,
          page_number: data.page_number || 0,
        },
        bookId,
      );
      onOpenChange(false);
      reset();
    } catch (error) {
      console.log(error);
      toast.error('Erro ao criar nota.');
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
            Adicionar nova nota
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
            <FieldLabel>Avaliação</FieldLabel>
            <Controller
              control={control}
              name="rating"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            {errors.rating && (
              <FieldError className="text-red-500">
                {errors.rating.message}
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
              Adicionar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
