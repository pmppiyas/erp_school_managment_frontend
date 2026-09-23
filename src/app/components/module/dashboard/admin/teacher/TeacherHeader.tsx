'use client';

import TeacherFormDialog from '@/app/components/module/dashboard/admin/teacher/TeacherFormData';
import ManagementPageHeader from '@/app/components/module/dashboard/ManagementPageHeader';
import { Plus, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

const TeacherHeader = () => {
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
      <TeacherFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        icon={<UserCheck />}
        title={'Teacher Management'}
        description="Manage teachers information and details"
        actions={[
          {
            label: 'Add Teacher',
            icon: Plus,
            onClick: () => setIsDialogOpen(true),
          },
        ]}
      />
    </div>
  );
};

export default TeacherHeader;
