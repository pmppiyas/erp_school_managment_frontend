import ManagementPageHeader from '@/app/components/module/dashboard/ManagementPageHeader';
import { BookOpen } from 'lucide-react';

const SubjectHeader = ({
  classSelector,
  modeSelector,
}: {
  classSelector: React.ReactNode;
  modeSelector: React.ReactNode;
}) => {
  return (
    <div>
      <ManagementPageHeader
        icon={<BookOpen />}
        title="Subject Management"
        description="Manage subjects information and details"
        actions={[classSelector, modeSelector]}
      />
    </div>
  );
};

export default SubjectHeader;
