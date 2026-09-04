import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';
import {
  loginFormSchema,
  type ILoginFormSchema,
} from '@/schemas/login-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { loginService } = useAuth();

  const onSubmit = (data: ILoginFormSchema) => {
    loginService(data.email, data.password);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
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
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <Link
              to="/esqueci-senha"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Esqueceu a senha?
            </Link>
          </div>
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
          <Button type="submit" className="cursor-pointer">
            Entrar
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Não possui uma conta?
            <Link to="/registro" className="ml-1 underline underline-offset-4">
              Registre-se
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
