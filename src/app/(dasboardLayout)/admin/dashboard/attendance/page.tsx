import { Suspense } from 'react';
import ManagementPageHeader from '@/app/components/module/dashboard/ManagementPageHeader';
import TabSelector from '@/app/components/shared/TabSelector';
import ClassSelector from '@/app/components/shared/ClassSelector';
import { getClasses } from '@/app/services/class/getAllClasses';
import { getCookie } from '@/lib/cookies';
import { CalendarCheck } from 'lucide-react';
import AttendanceSkeleton from '@/app/components/module/dashboard/student/attendance/AttendanceSkeleton';
import AttendanceWrapper from '@/app/components/module/dashboard/admin/attendance/AttendanceWrapper';

const AttendancePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ tabs: string; classId?: string }>;
}) => {
  const params = await searchParams;
  const tab = params.tabs ?? 'mark';
  const classId = params.classId;
  const { classes } = await getClasses();

  const cookieClassId = await getCookie('selectedClassId');

  const seletedClassId = classId || cookieClassId || 'teacher';

  const attendanceTabs = [
    { label: 'Mark Attendance', value: 'mark' },
    { label: 'Today Records', value: 'today' },
    { label: 'Monthly View', value: 'month' },
  ];

  const title =
    tab === 'mark'
      ? 'Mark Attendance'
      : tab === 'today'
        ? 'Today Records'
        : 'Monthly View';

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        icon={<CalendarCheck />}
        title={title}
        description="Monitor and manage daily presence for students and teachers."
        actions={[
          <TabSelector key="attendance-tabs" tabs={attendanceTabs} />,
          <ClassSelector
            key={seletedClassId}
            classes={classes}
            withTeacher={true}
          />,
        ]}
      />

      <div className="mt-4">
        <Suspense key={`${classId}-${tab}`} fallback={<AttendanceSkeleton />}>
          <AttendanceWrapper classId={classId as string} mode={tab} />
        </Suspense>
      </div>
    </div>
  );
};

export default AttendancePage;
