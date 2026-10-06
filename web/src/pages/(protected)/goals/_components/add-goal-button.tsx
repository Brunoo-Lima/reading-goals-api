import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';
import { FormGoal } from './forms/form-goal';
import { useState } from 'react';

export const AddGoalButton = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="self-end">
          <PlusIcon className="size-4" />
          Nova Meta
        </Button>
      </DialogTrigger>
      <FormGoal initialData={null} setDialogOpen={setDialogOpen} />
    </Dialog>
  );
};
