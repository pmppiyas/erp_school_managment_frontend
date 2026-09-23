import { Suspense } from 'react';
import ManagementPageHeader from '@/app/components/module/dashboard/ManagementPageHeader';
import { DateSelector } from '@/app/components/shared/DateSelector';
import DiaryDataWrapper from '@/app/components/module/dashboard/student/diary/DiaryDataWrapper';
import DiaryTableSkeleton from '@/app/components/module/dashboard/student/diary/DiaryTableSkeleton';
import { BookOpenCheck } from 'lucide-react';

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) => {
  const params = await searchParams;
  const today = params.date || new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="Daily Diary"
        description="Manage daily every period's diary and class activities."
        icon={<BookOpenCheck />}
        actions={[<DateSelector key="date-picker" withNavigation={true} />]}
      />

      <Suspense key={today} fallback={<DiaryTableSkeleton />}>
        <DiaryDataWrapper date={today} />
      </Suspense>
    </div>
  );
};

export default page;
