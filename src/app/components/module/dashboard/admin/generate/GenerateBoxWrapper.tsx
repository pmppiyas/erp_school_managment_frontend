import GenerateBox from '@/app/components/module/dashboard/admin/generate/GenerateBox';
import { getAllStudents } from '@/app/services/student/getAllStudents';

const GenerateBoxWrapper = async ({
  tab,
  classId,
  term,
  year,
}: {
  tab: string;
  classId?: string | null;
  term?: string;
  year?: string;
}) => {
  if (!classId)
    return (
      <div className="text-center py-10 text-muted-foreground">
        Please select a class.
      </div>
    );

  const { students } = await getAllStudents(classId);

  return (
    <GenerateBox tab={tab} students={students} term={term} year={year} />
  );
};

export default GenerateBoxWrapper;
