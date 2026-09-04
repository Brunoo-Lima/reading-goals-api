import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  forgotPasswordFormSchema,
  type IForgotPasswordFormSchema,
} from '@/schemas/forgot-password-form-schema';
import { useForgotPassword } from '@/services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

export function ForgotPasswordForm() {
  const navigate = useNavigate();
  const forgotPassword = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: { email: '', securityKey: '' },
  });

  const onSubmit = async (data: IForgotPasswordFormSchema) => {
    const { token } = await forgotPassword.mutateAsync(data);
    navigate('/redefinir-senha', { state: { token } });
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
          <FieldLabel htmlFor="securityKey">Chave de segurança</FieldLabel>
          <Input
            id="securityKey"
            type="password"
            placeholder="Sua chave de segurança"
            {...register('securityKey')}
          />
          <FieldError className="text-xs">
            {errors.securityKey?.message}
          </FieldError>
        </Field>

        <Field>
          <Button type="submit" disabled={forgotPassword.isPending}>
            {forgotPassword.isPending ? 'Verificando...' : 'Continuar'}
          </Button>
        </Field>

        <Link
          to="/"
          className="block text-center text-sm underline underline-offset-4"
        >
          Voltar para o login
        </Link>
      </FieldGroup>
    </form>
  );
}
