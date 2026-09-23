'use client';

import ManagementPageHeader from '@/app/components/module/dashboard/ManagementPageHeader';
import FeeTypeFormDialog from './FeetypeFormData';
import { Plus, Receipt } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { IClass } from '@/types/class.interface';

const FeeTypeHeader = ({ classes }: { classes: IClass[] }) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <div>
      <ManagementPageHeader
        icon={<Receipt />}
        title="Fee Type Management"
        description="Manage fee type's information and details"
        actions={[
          {
            label: 'Add FeeType',
            icon: Plus,
            onClick: () => setIsDialogOpen(true),
          },
        ]}
      />

      <FeeTypeFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
        classes={classes}
      />
    </div>
  );
};

export default FeeTypeHeader;
