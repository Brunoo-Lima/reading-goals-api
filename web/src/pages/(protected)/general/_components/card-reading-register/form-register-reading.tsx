import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  readingLogFormSchema,
  type IReadingLogFormSchema,
} from '@/schemas/reading-log-form-schema';
import { useRegisterReadingLog } from '@/services/reading-log';

const today = () => new Date().toISOString().slice(0, 10);

interface IFormRegisterReadingProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  books: { id: string; title: string }[];
}

export const FormRegisterReading = ({
  open,
  onOpenChange,
  books,
}: IFormRegisterReadingProps) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IReadingLogFormSchema>({
    resolver: zodResolver(readingLogFormSchema),
    defaultValues: {
      book_id: '',
      date: today(),
      notes_about_session: '',
    },
  });

  const registerReading = useRegisterReadingLog();

  const handleClose = (value: boolean) => {
    if (!value) reset({ book_id: '', date: today(), notes_about_session: '' });
    onOpenChange(value);
  };

  const submit = async (data: IReadingLogFormSchema) => {
    const payload = {
      pages_read: data.pages_read,
      date: new Date(data.date),
      notes_about_session: data.notes_about_session || undefined,
    };

    await registerReading.mutateAsync({
      bookId: data.book_id,
      readingLog: payload,
    });

    handleClose(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar leitura</DialogTitle>
          <DialogDescription>
            Anote quantas páginas você leu nesta sessão.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Livro</Label>
            <Controller
              control={control}
              name="book_id"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um livro" />
                  </SelectTrigger>
                  <SelectContent>
                    {books.map((book) => (
                      <SelectItem key={book.id} value={book.id}>
                        {book.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.book_id && (
              <p className="text-sm text-destructive">
                {errors.book_id.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pages_read">Páginas lidas</Label>
              <Input
                id="pages_read"
                type="number"
                min={1}
                {...register('pages_read', { valueAsNumber: true })}
              />
              {errors.pages_read && (
                <p className="text-sm text-destructive">
                  {errors.pages_read.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                max={today()}
                {...register('date')}
              />
              {errors.date && (
                <p className="text-sm text-destructive">
                  {errors.date.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Anotações (opcional)</Label>
            <Textarea
              id="notes"
              rows={3}
              placeholder="O que achou dessa sessão?"
              {...register('notes_about_session')}
            />
            {errors.notes_about_session && (
              <p className="text-sm text-destructive">
                {errors.notes_about_session.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
