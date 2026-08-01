import { FormUser } from '@/components/form-user';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth';
import { useState } from 'react';

export const InfoUser = () => {
  const { user } = useAuth();
  const [openForm, setOpenForm] = useState<boolean>(false);

  if (!user) {
    return;
  }

  return (
    <>
      <div className="p-2 rounded-lg">
        <h3 className="font-bold text-foreground mb-6">Configurações</h3>

        <div className="space-y-4 bg-card border-border/50 p-6 rounded-lg">
          <div className="flex flex-col gap-2">
            <strong>Nome</strong>
            <p className="">{user.name}</p>
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <strong>Email</strong>
            <p>{user.email}</p>
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <strong>Senha</strong>
            <p>*********</p>
          </div>

          <div className="flex justify-end mt-6">
            <Button className="w-32" onClick={() => setOpenForm(true)}>
              Editar
            </Button>
          </div>
        </div>
      </div>

      {openForm && (
        <FormUser
          initialData={user}
          open={openForm}
          handleCloseForm={() => setOpenForm(false)}
        />
      )}
    </>
  );
};
