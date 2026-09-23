'use client';

import ManagementPageHeader from '@/app/components/module/dashboard/ManagementPageHeader';
import { CalendarRange } from 'lucide-react';

const ScheduleHeader = ({
  selectOption,
  selectDayClass,
}: {
  selectOption: React.ReactNode;
  selectDayClass: React.ReactNode;
}) => {
  return (
    <ManagementPageHeader
      icon={<CalendarRange />}
      title="Schedule Management"
      description="Manage schedules information and details"
      actions={[selectOption, selectDayClass]}
    />
  );
};

export default ScheduleHeader;
