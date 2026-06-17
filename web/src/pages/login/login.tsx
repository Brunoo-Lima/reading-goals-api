import { LoginForm } from '@/components/login-form/login-form';

export function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="flex flex-col gap-1 mb-4">
              <h1 className="text-2xl font-bold">
                Faça login para acessar sua conta.
              </h1>
              <p className="text-sm text-balance text-muted-foreground">
                Insira seu e-mail abaixo para acessar sua conta.
              </p>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/background.webp"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
