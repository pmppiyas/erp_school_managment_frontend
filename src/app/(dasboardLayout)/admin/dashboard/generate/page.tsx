import { Suspense } from 'react';
import GenerateHeader from '@/app/components/module/dashboard/admin/generate/GenerateHeader';
import ClassSelector from '@/app/components/shared/ClassSelector';
import TabSelector from '@/app/components/shared/TabSelector';
import TermSelector from '@/app/components/shared/TermSelector';
import YearSelector from '@/app/components/shared/YearSelector';
import { getClasses } from '@/app/services/class/getAllClasses';
import { TableSkeleton } from '@/app/components/shared/TableSkeleton';
import { getCookie } from '@/lib/cookies';
import GenerateBoxWrapper from '@/app/components/module/dashboard/admin/generate/GenerateBoxWrapper';

async function page({
  searchParams,
}: {
  searchParams: Promise<{
    tabs?: string;
    classId?: string;
    term?: string;
    year?: string;
  }>;
}) {
  const { tabs, classId, term, year } = await searchParams;
  const tab = tabs || 'admit';

  const classesData = await getClasses();
  const classes = classesData?.classes || [];

  const generateTabs = [
    { label: 'Admit Card', value: 'admit' },
    { label: 'Testimonial', value: 'testimonial' },
  ];

  const cookieClassId = await getCookie('selectedClassId');

  const selectedClassId = classId ?? cookieClassId;
  const selectedTerm = term || 'FIRST';
  const currentYear = new Date().getFullYear().toString();
  const selectedYear = year || currentYear;

  return (
    <>
      <GenerateHeader
        selectTab={<TabSelector tabs={generateTabs} />}
        tab={tab}
        classSelector={<ClassSelector classes={classes} />}
        termSelector={
          tab === 'admit' ? <TermSelector defaultTerm="FIRST" /> : undefined
        }
        yearSelector={<YearSelector />}
      />

      <div>
        <Suspense
          key={tab + (selectedClassId || '') + selectedTerm + selectedYear}
          fallback={<TableSkeleton columnCount={7} rowCount={7} />}
        >
          <GenerateBoxWrapper
            tab={tab}
            classId={selectedClassId}
            term={selectedTerm}
            year={selectedYear}
          />
        </Suspense>
      </div>
    </>
  );
}

export default page;
