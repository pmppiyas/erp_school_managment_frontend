'use client';

import AdminFormDialog from '@/app/components/module/dashboard/admin/manage/AdminFromDialog';
import ManagementPageHeader from '@/app/components/module/dashboard/ManagementPageHeader';
import { useState } from 'react';
import { Plus, ShieldCheck } from 'lucide-react';

const ManagePageHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <div>
      <ManagementPageHeader
        icon={<ShieldCheck />}
        title="Manage your desk"
        description="You can manage everything from here"
        actions={[
          {
            label: 'Add Admin',
            icon: Plus,
            onClick: () => setIsDialogOpen(true),
          },
        ]}
      />

      <AdminFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default ManagePageHeader;
