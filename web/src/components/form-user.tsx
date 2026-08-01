import type { IUser } from '@/@types/IUser';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  userFormSchema,
  type IUserFormSchema,
} from '@/schemas/user-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useCreateUser, useUpdateUser } from '@/services/user';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';

interface IFormUserProps {
  open: boolean;
  handleCloseForm: (open: boolean) => void;
  initialData?: IUser;
}
export const FormUser = ({
  open,
  handleCloseForm,
  initialData,
}: IFormUserProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserFormSchema>({
    resolver: zodResolver(userFormSchema as any),
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      password: initialData?.password || '',
    },
  });
  const { refreshUser } = useAuth();

  const updateUser = useUpdateUser();
  const createUser = useCreateUser();

  useEffect(() => {
    reset({
      name: initialData?.name || '',
      email: initialData?.email || '',
      password: initialData?.password || '',
    });
  }, [initialData, reset]);

  const onSubmit = async (data: IUserFormSchema) => {
    try {
      if (initialData) {
        await updateUser.mutateAsync(data);
        await refreshUser();
      } else {
        await createUser.mutateAsync(data);
      }

      handleCloseForm(false);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseForm}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            {`${initialData ? 'Editar ' : 'Novo '} usuário`}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <FieldLabel htmlFor="name">Nome</FieldLabel>
            <Input
              id="name"
              type="text"
              placeholder="ex: Livro 1"
              {...register('name')}
            />
            <FieldError className="text-xs">{errors.name?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              {...register('email')}
            />
            <FieldError className="text-xs">{errors.email?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="********"
              {...register('password')}
            />
            <FieldError className="text-xs">
              {errors.password?.message}
            </FieldError>
          </Field>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              onClick={() => handleCloseForm(false)}
              className="btn btn-ghost"
            >
              Cancelar
            </Button>
            <Button type="submit" className="btn btn-primary">
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
