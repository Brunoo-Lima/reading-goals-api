import { ResetPasswordForm } from '@/components/reset-password-form/reset-password-form';
import { Navigate, useLocation } from 'react-router-dom';

interface IResetPasswordLocationState {
  token?: string;
}

export function ResetPasswordPage() {
  const { state } = useLocation();
  const { token } = (state ?? {}) as IResetPasswordLocationState;

  if (!token) {
    return <Navigate to="/esqueci-senha" replace />;
  }

  return (
    <div className="flex min-h-svh items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Crie uma nova senha</h1>
          <p className="text-sm text-muted-foreground">
            Escolha uma senha com pelo menos seis caracteres.
          </p>
        </div>
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
