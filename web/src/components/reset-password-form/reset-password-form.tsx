import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  resetPasswordFormSchema,
  type IResetPasswordFormSchema,
} from '@/schemas/reset-password-form-schema';
import { useResetPassword } from '@/services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface IResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: IResetPasswordFormProps) {
  const navigate = useNavigate();
  const resetPassword = useResetPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async ({ password }: IResetPasswordFormSchema) => {
    await resetPassword.mutateAsync({ token, password });
    toast.success('Senha alterada com sucesso!');
    navigate('/');
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="password">Nova senha</FieldLabel>
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
          <FieldLabel htmlFor="confirmPassword">
            Confirme a nova senha
          </FieldLabel>
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
          <Button type="submit" disabled={resetPassword.isPending}>
            {resetPassword.isPending ? 'Alterando...' : 'Alterar senha'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
