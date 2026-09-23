import ManagementPageHeader from '@/app/components/module/dashboard/ManagementPageHeader';
import { CalendarCheck } from 'lucide-react';

const AttendanceHeader = ({
  selectDayClass,
  selectMode,
}: {
  selectDayClass: React.ReactNode;
  selectMode: React.ReactNode;
}) => {
  return (
    <div>
      <ManagementPageHeader
        icon={<CalendarCheck />}
        title="Attendance Management"
        description="Manage attendances information and details"
        actions={[selectMode, selectDayClass]}
      />
    </div>
  );
};

export default AttendanceHeader;
