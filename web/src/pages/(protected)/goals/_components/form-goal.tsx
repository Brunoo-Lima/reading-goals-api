import {
  GOAL_TYPE_LABELS,
  GOAL_TYPE_UNITS,
  GOAL_TYPES,
  type IGoal,
} from '@/@types/IGoal';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useBooks } from '@/hooks/use-books';
import { useGoals } from '@/hooks/use-goals';
import { cn } from '@/lib/utils';
import {
  goalFormSchema,
  type IGoalFormSchema,
} from '@/schemas/goal-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface IFormGoalProps {
  initialData: IGoal | null;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormGoal = ({ setDialogOpen, initialData }: IFormGoalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm<IGoalFormSchema>({
    resolver: zodResolver(goalFormSchema as any),
    defaultValues: {
      type: initialData?.type || 'BOOKS_PER_YEAR',
      target_value: initialData?.target_value || 0,
      current_value: initialData?.current_value || 0,
      start_date: initialData?.start_date || new Date(),
      end_date: initialData?.end_date || undefined,
      book_id: initialData?.book_id || undefined,
    },
  });

  const { books } = useBooks();
  const { addGoal } = useGoals();

  const typeGoal = watch('type');
  const selectedBookId = watch('book_id');

  useEffect(() => {
    reset({
      type: initialData?.type || 'BOOKS_PER_YEAR',
      target_value: initialData?.target_value || 0,
      current_value: initialData?.current_value || 0,
      start_date: initialData?.start_date || new Date(),
      end_date: initialData?.end_date || undefined,
      book_id: initialData?.book_id || undefined,
    });
  }, [initialData, reset]);

  const onSubmit = async (data: IGoalFormSchema) => {
    const goalData = {
      ...data,
      target_value: Number(data.target_value) || 0,
      current_value: Number(data.current_value) || 0,
    };

    console.log(`goal `, goalData);

    try {
      if (initialData) {
        // await updateGoal(initialData.id, goalData);
      } else {
        await addGoal(goalData, selectedBookId);
      }
      setDialogOpen(false);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-lg font-bold">
          {initialData ? 'Editar' : 'Criar'} meta
        </DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field className="gap-2">
          <FieldLabel>Tipo de meta</FieldLabel>
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  {GOAL_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {GOAL_TYPE_LABELS[t]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors.type && (
            <FieldError className="text-red-500">
              {errors.type.message}
            </FieldError>
          )}
        </Field>

        <Field className="gap-2">
          <FieldLabel>Valor alvo ({GOAL_TYPE_UNITS[typeGoal]})</FieldLabel>
          <Input placeholder="Valor alvo" {...register('target_value')} />
          {errors.target_value && (
            <FieldError className="text-red-500">
              {errors.target_value.message}
            </FieldError>
          )}
        </Field>

        <Field className="gap-2">
          <FieldLabel>Valor atual (opcional)</FieldLabel>
          <Input placeholder="Valor atual" {...register('current_value')} />
          {errors.current_value && (
            <FieldError className="text-red-500">
              {errors.current_value.message}
            </FieldError>
          )}
        </Field>

        {typeGoal === 'SPECIFIC_BOOK' && (
          <Field className="gap-2">
            <FieldLabel>Livro</FieldLabel>
            <Controller
              control={control}
              name="book_id"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
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
          </Field>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Field className="gap-2">
            <FieldLabel>Data de início</FieldLabel>
            <Controller
              control={control}
              name="start_date"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, 'PPP', { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />

            {errors.start_date && (
              <FieldError className="text-red-500">
                {errors.start_date.message}
              </FieldError>
            )}
          </Field>
          <Field className="gap-2">
            <FieldLabel>Data final (opcional)</FieldLabel>
            <Controller
              control={control}
              name="end_date"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, 'PPP', { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />

            {errors.end_date && (
              <FieldError className="text-red-500">
                {errors.end_date.message}
              </FieldError>
            )}
          </Field>
        </div>

        <div className="flex justify-end gap-3 pt-6 *:cursor-pointer">
          <Button variant="ghost" onClick={() => setDialogOpen(false)}>
            Cancelar
          </Button>
          <Button type="submit">Salvar meta</Button>
        </div>
      </form>
    </DialogContent>
  );
};
