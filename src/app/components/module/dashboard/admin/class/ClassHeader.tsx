'use client';

import ManagementPageHeader from '@/app/components/module/dashboard/ManagementPageHeader';
import { useState } from 'react';
import { Plus, School } from 'lucide-react';
import ClassFormDialog from '@/app/components/module/dashboard/admin/class/ClassFromDialog';

const ClassHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      <ManagementPageHeader
        icon={<School />}
        title="Class Management"
        description="Manage classes information and details"
        actions={[
          {
            label: 'Add Class',
            icon: Plus,
            onClick: () => setIsDialogOpen(true),
          },
        ]}
      />

      <ClassFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default ClassHeader;
