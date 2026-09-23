import ManagementPageHeader from '@/app/components/module/dashboard/ManagementPageHeader';
import React from 'react';
import { Award } from 'lucide-react';

const ResultHeader = ({
  tabSelector,
  classSelector,
  termSelector,
  yearSelector,
  tab,
}: {
  tabSelector: React.ReactNode;
  classSelector: React.ReactNode;
  termSelector: React.ReactNode;
  yearSelector: React.ReactNode;
  tab: string;
}) => {
  return (
    <div>
      <ManagementPageHeader
        icon={<Award />}
        title={tab === 'view' ? 'View Results' : 'Upload Excel Results'}
        description={
          tab === 'view'
            ? 'View student results.'
            : 'Upload results via Excel file.'
        }
        actions={[tabSelector, termSelector, yearSelector, classSelector]}
      />
    </div>
  );
};

export default ResultHeader;
