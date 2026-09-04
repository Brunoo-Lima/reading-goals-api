import { RegisterForm } from '@/components/register-form/register-form';

export function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <div className="mb-4 flex flex-col gap-1">
              <h1 className="text-2xl font-bold">Crie sua conta</h1>
              <p className="text-sm text-balance text-muted-foreground">
                Preencha seus dados para começar a organizar suas leituras.
              </p>
            </div>

            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/background.webp"
          alt="Livros em uma estante"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
