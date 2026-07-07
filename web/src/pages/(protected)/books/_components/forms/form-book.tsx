import type { IBook } from '@/@types/IBook';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
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
import {
  bookFormSchema,
  type IBookFormSchema,
} from '@/schemas/book-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { genres } from '@/utils/genre-list';
import { useEffect } from 'react';
import { useBooks } from '@/hooks/use-books';
import { toast } from 'sonner';

interface IFormBookProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: IBook | null;
}

export const FormBook = ({
  open,
  onOpenChange,
  initialData,
}: IFormBookProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm<IBookFormSchema>({
    resolver: zodResolver(bookFormSchema as any),
    defaultValues: {
      title: initialData?.title || '',
      author: initialData?.author || '',
      genre: initialData?.genre || [],
      status: initialData?.status || 'READING',
      total_pages: initialData?.total_pages || 0,
      current_page: initialData?.current_page || 0,
      start_date: initialData?.start_date || new Date(),
      end_date: initialData?.end_date || undefined,
    },
  });

  const { addBook, updateBook } = useBooks();

  const statusWatching = watch('status');

  useEffect(() => {
    reset({
      title: initialData?.title || '',
      author: initialData?.author || '',
      genre: initialData?.genre.map((genre) => genre) || [],
      status: initialData?.status || 'READING',
      total_pages: initialData?.total_pages || 0,
      current_page: initialData?.current_page || 0,
      start_date: initialData?.start_date
        ? new Date(initialData.start_date)
        : new Date(),
      end_date: initialData?.end_date
        ? new Date(initialData.end_date)
        : undefined,
    });
  }, [initialData, reset]);

  const onSubmit = async (data: IBookFormSchema) => {
    try {
      if (initialData) {
        await updateBook(initialData.id, data);
      } else {
        await addBook(data);
      }
      onOpenChange(false);
      reset();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao criar livro.');
    }
  };

  function handleCloseForm() {
    reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleCloseForm}>
      <DialogContent className="sm:max-w-md h-[600px] scrollArea">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            {initialData ? 'Editar Livro' : 'Adicionar Novo Livro'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field className="gap-2">
            <FieldLabel>Título</FieldLabel>
            <Input placeholder="Nome do livro" {...register('title')} />
            {errors.title && (
              <FieldError className="text-red-500">
                {errors.title.message}
              </FieldError>
            )}
          </Field>

          <Field className="gap-2">
            <FieldLabel>Autor</FieldLabel>
            <Input placeholder="Nome do autor" {...register('author')} />
            {errors.author && (
              <FieldError className="text-red-500">
                {errors.author.message}
              </FieldError>
            )}
          </Field>

          <Field className="gap-2">
            <FieldLabel>Total de páginas</FieldLabel>
            <Input
              type="number"
              placeholder="Total de páginas"
              {...register('total_pages', { valueAsNumber: true })}
            />
            {errors.total_pages && (
              <FieldError className="text-red-500">
                {errors.total_pages.message}
              </FieldError>
            )}
          </Field>

          <Field className="gap-2">
            <FieldLabel>Gênero</FieldLabel>
            <Controller
              control={control}
              name="genre"
              render={({ field }) => {
                const selected: string[] = field.value ?? [];

                const toggleGenre = (value: string) => {
                  field.onChange(
                    selected.includes(value)
                      ? selected.filter((v) => v !== value)
                      : [...selected, value],
                  );
                };

                return (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between font-normal"
                      >
                        <span className="truncate">
                          {selected.length > 0
                            ? genres
                                .filter((g) => selected.includes(g.value))
                                .map((g) => g.label)
                                .join(', ')
                            : 'Selecione um ou mais gêneros'}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                      {genres.map(({ value, label }) => (
                        <DropdownMenuCheckboxItem
                          key={value}
                          checked={selected.includes(value)}
                          onSelect={(e) => e.preventDefault()}
                          onCheckedChange={() => toggleGenre(value)}
                        >
                          {label}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }}
            />

            {errors.genre && (
              <FieldError className="text-red-500">
                {errors.genre.message}
              </FieldError>
            )}
          </Field>

          <Field className="gap-2">
            <FieldLabel>Status</FieldLabel>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WISHLIST">Quero ler</SelectItem>
                    <SelectItem value="READING">Lendo</SelectItem>
                    <SelectItem value="COMPLETED">Concluído</SelectItem>
                    <SelectItem value="ABANDONED">Abandonado</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            {errors.status && (
              <FieldError className="text-red-500">
                {errors.status.message}
              </FieldError>
            )}
          </Field>

          {statusWatching === 'READING' && (
            <Field className="gap-2">
              <FieldLabel>Página atual (opcional)</FieldLabel>
              <Input
                type="number"
                placeholder="Página atual"
                {...register('current_page', { valueAsNumber: true })}
              />
              {errors.current_page && (
                <FieldError className="text-red-500">
                  {errors.current_page.message}
                </FieldError>
              )}
            </Field>
          )}

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

          {/* <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Total de Páginas
              </label>
              <Input
                type="number"
                placeholder="Ex: 300"
                {...register('total_pages')}
              />
              {errors.total_pages && (
                <small className="text-red-500">
                  {errors.total_pages.message}
                </small>
              )}
            </div> */}

          {/* {formData.status === 'reading' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Página Atual
                </label>
                <Input
                  type="number"
                  value={formData.currentPage}
                  onChange={(e) =>
                    setFormData({ ...formData, currentPage: e.target.value })
                  }
                  placeholder="Ex: 50"
                />
              </div>
            )}
          </div>

          {formData.status === 'completed' && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Avaliação (1-5)
              </label>
              <Select
                value={formData.rating}
                onValueChange={(value) =>
                  setFormData({ ...formData, rating: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma nota" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <SelectItem key={n} value={n.toString()}>
                      {n} {n === 1 ? 'estrela' : 'estrelas'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )} */}

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
              {initialData ? 'Salvar' : 'Adicionar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
