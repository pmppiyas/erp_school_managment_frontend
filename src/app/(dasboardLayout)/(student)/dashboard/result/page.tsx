import { Suspense } from 'react';
import ManagementPageHeader from '@/app/components/module/dashboard/ManagementPageHeader';
import ResultSkeleton from '@/app/components/module/dashboard/student/result/ResultSkeleton';
import ResultDataWrapper from '@/app/components/module/dashboard/student/result/ResultDataWrapper';
import TermSelector from '@/app/components/shared/TermSelector';
import { GraduationCap } from 'lucide-react';

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    year?: string;
    term?: string;
  }>;
}) => {
  const params = await searchParams;

  const currentYear = new Date().getFullYear().toString();
  const selectedYear = params.year || currentYear;
  const selectedTerm = params.term || 'FINAL';

  const termLabel =
    selectedTerm.charAt(0).toUpperCase() + selectedTerm.slice(1).toLowerCase();

  const title =
    selectedTerm.toUpperCase() === 'FINAL'
      ? 'Final Results'
      : `${termLabel} Term Results`;

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title={title}
        description="View your semester-wise performance, grades, and GPA."
        icon={<GraduationCap />}
        actions={[<TermSelector key={selectedTerm} />]}
      />
      <Suspense
        key={`${selectedYear}-${selectedTerm}`}
        fallback={<ResultSkeleton />}
      >
        <ResultDataWrapper year={selectedYear} term={selectedTerm} />
      </Suspense>
    </div>
  );
};

export default page;
