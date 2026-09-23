import ManagementPageHeader from '@/app/components/module/dashboard/ManagementPageHeader';
import ClassSelector from '@/app/components/shared/ClassSelector';
import { DateSelector } from '@/app/components/shared/DateSelector';
import { IClass } from '@/types/class.interface';
import { BookOpenCheck } from 'lucide-react';

const DiaryHeader = ({ classes }: { classes: IClass[] }) => {
  return (
    <div>
      <ManagementPageHeader
        icon={<BookOpenCheck />}
        title="Daily Diary"
        description="Manage daily every period's diary and class activities."
        actions={[
          <DateSelector key="date-picker" withNavigation={true} />,
          <ClassSelector classes={classes} key="class-selector" />,
        ]}
      />
    </div>
  );
};

export default DiaryHeader;
