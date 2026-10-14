import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import type { IBook } from '@/@types/IBook';
import {
  bookFormSchemaAddCover,
  type IBookFormSchemaAddCover,
} from '@/schemas/book-form-schema';
import { useBooks } from '@/hooks/use-books';
import { useSearchBooksPerTitle } from '@/services/api-lib-books';

interface IFormAddCoverBookProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: IBook | null;
  bookId: string;
}

export const FormAddCoverBook = ({
  open,
  onOpenChange,
  initialData,
  bookId,
}: IFormAddCoverBookProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<IBookFormSchemaAddCover>({
    resolver: zodResolver(bookFormSchemaAddCover),
    defaultValues: { title: '' },
  });

  const { updateBook } = useBooks();
  const [searchedTitle, setSearchedTitle] = useState('');

  const title = watch('title');
  const trimmedTitle = title?.trim() ?? '';

  const { data, isFetching, isError } = useSearchBooksPerTitle(searchedTitle);

  // só mostra resultado se o input ainda bate com o que foi pesquisado
  const isCurrent = searchedTitle.length >= 3 && searchedTitle === trimmedTitle;
  const coverId = isCurrent ? (data?.coverId ?? null) : null;
  const coverUrl = isCurrent ? (data?.coverUrl ?? null) : null;
  const notFound =
    isCurrent && !isFetching && !isError && !!data && !data.coverId;

  function handleSearchCover() {
    if (trimmedTitle.length < 3) return;
    setSearchedTitle(trimmedTitle);
  }

  const onSubmit = async () => {
    try {
      await updateBook(bookId, {
        cover_id: coverId,
      });
      handleCloseForm();
    } catch (error) {
      console.log(error);
    }
  };

  function handleCloseForm() {
    reset();
    setSearchedTitle('');
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleCloseForm}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            {`${initialData ? 'Editar' : 'Adicionar'} capa do livro`}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field className="gap-2">
            <FieldLabel>Titulo do livro</FieldLabel>
            <div className="flex gap-2">
              <Input
                placeholder="Digite o titulo do livro"
                {...register('title', {
                  // título mudou -> descarta a capa antiga
                  onChange: () => setSearchedTitle(''),
                })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault(); // não submete o form
                    handleSearchCover();
                  }
                }}
              />
              <Button
                type="button"
                variant="secondary"
                className="cursor-pointer"
                onClick={handleSearchCover}
                disabled={isFetching || trimmedTitle.length < 3}
              >
                {isFetching ? 'Buscando...' : 'Buscar'}
              </Button>
            </div>
            {errors.title && (
              <FieldError className="text-red-500">
                {errors.title.message}
              </FieldError>
            )}
          </Field>

          {/* Preview da capa */}
          <div className="flex min-h-48 items-center justify-center rounded-md border border-dashed">
            {isFetching && (
              <span className="text-sm text-muted-foreground">
                Buscando capa...
              </span>
            )}

            {!isFetching && coverUrl && (
              <img
                src={coverUrl}
                alt={`Capa de ${trimmedTitle}`}
                className="h-48 rounded shadow-md"
              />
            )}

            {!isFetching && isError && isCurrent && (
              <span className="text-sm text-red-500">
                Erro ao buscar a capa
              </span>
            )}

            {!isFetching && notFound && (
              <span className="text-sm text-muted-foreground">
                Nenhuma capa encontrada
              </span>
            )}

            {!isFetching && !coverUrl && !notFound && !isError && (
              <span className="text-sm text-muted-foreground">
                A capa aparecerá aqui
              </span>
            )}
          </div>

          <div className="flex gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1 cursor-pointer"
              onClick={handleCloseForm}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 cursor-pointer"
              disabled={!coverId}
            >
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
