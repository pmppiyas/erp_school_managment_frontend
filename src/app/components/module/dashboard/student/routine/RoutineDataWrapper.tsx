import RoutineTable from '@/app/components/module/dashboard/student/routine/RoutineTable';
import { getStudentRoutine } from '@/app/services/schedule/getStudentRoutine';

const RoutineDataWrapper = async ({ day }: { day: string }) => {
  const data = await getStudentRoutine(day);

  return <RoutineTable slots={data?.slots || []} />;
};

export default RoutineDataWrapper;
