import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';
import { FormGoal } from './form-goal';
import { useState } from 'react';

export const AddGoalButton = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Nova Meta
        </Button>
      </DialogTrigger>
      <FormGoal initialData={null} setDialogOpen={setDialogOpen} />
    </Dialog>
  );
};
