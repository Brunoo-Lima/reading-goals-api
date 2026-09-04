import { ForgotPasswordForm } from '@/components/forgot-password-form/forgot-password-form';

export function ForgotPasswordPage() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Esqueceu sua senha?</h1>
          <p className="text-sm text-muted-foreground">
            Informe seu e-mail e sua chave de segurança para continuar.
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
