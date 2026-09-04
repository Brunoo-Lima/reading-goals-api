import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  registerFormSchema,
  type IRegisterFormSchema,
} from '@/schemas/register-form-schema';
import { useCreateUser } from '@/services/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

export function RegisterForm() {
  const navigate = useNavigate();
  const createUser = useCreateUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      securityKey: '',
    },
  });

  const onSubmit = async (data: IRegisterFormSchema) => {
    await createUser.mutateAsync({
      name: data.name,
      email: data.email,
      password: data.password,
      securityKey: data.securityKey,
    });
    navigate('/');
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Nome</FieldLabel>
          <Input id="name" placeholder="Seu nome" {...register('name')} />
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
            maxLength={6}
            placeholder="••••••••"
            {...register('password')}
          />
          <FieldError className="text-xs">
            {errors.password?.message}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirme sua senha</FieldLabel>
          <Input
            id="confirmPassword"
            type="password"
            maxLength={6}
            placeholder="••••••••"
            {...register('confirmPassword')}
          />
          <FieldError className="text-xs">
            {errors.confirmPassword?.message}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="securityKey">Chave de segurança</FieldLabel>
          <Input
            id="securityKey"
            type="password"
            placeholder="Uma chave para recuperar sua senha"
            {...register('securityKey')}
          />
          <FieldDescription>
            Você precisará dela caso esqueça sua senha.
          </FieldDescription>
          <FieldError className="text-xs">
            {errors.securityKey?.message}
          </FieldError>
        </Field>

        <Field>
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={createUser.isPending}
          >
            {createUser.isPending ? 'Criando conta...' : 'Criar conta'}
          </Button>
        </Field>

        <Field>
          <FieldDescription className="text-center">
            Já possui uma conta?
            <Link to="/" className="ml-1 underline underline-offset-4">
              Faça login
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
