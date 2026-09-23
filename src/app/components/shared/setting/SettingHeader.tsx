import ManagementPageHeader from '@/app/components/module/dashboard/ManagementPageHeader';
import { Settings } from 'lucide-react';

const SettingHeader = () => {
  return (
    <div>
      <ManagementPageHeader
        icon={<Settings className="w-6 h-6 text-primary-foreground" />}
        title="Account Settings"
        description="Manage your personal profile information, security credentials, and system preferences."
      />
    </div>
  );
};

export default SettingHeader;
