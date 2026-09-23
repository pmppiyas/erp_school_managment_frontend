'use client';

import { useState } from 'react';
import ProfileSection from '@/app/components/shared/setting/ProfileSection';
import SecuritySection from '@/app/components/shared/setting/SecuritySection';
import PreferencesSection from '@/app/components/shared/setting/PreferencesSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, ShieldCheck, Palette, AlertCircle } from 'lucide-react';
import { IUserProfile } from '@/types/user.inteface';

interface SettingProps {
  user: IUserProfile;
}

const Setting = ({ user }: SettingProps) => {
  const isPasswordChangeRequired = user?.needPasswordChange;
  const [activeTab, setActiveTab] = useState<string>(
    isPasswordChangeRequired ? 'security' : 'profile'
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-3">
          <TabsList className="bg-muted/60 dark:bg-muted/40 p-1 rounded-xl h-11 border border-border/60">
            <TabsTrigger
              value="profile"
              className="gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg"
            >
              <User className="w-4 h-4" />
              <span>Profile Information</span>
            </TabsTrigger>

            <TabsTrigger
              value="security"
              className="gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg relative"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Security & Password</span>
              {isPasswordChangeRequired && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
              )}
            </TabsTrigger>

            <TabsTrigger
              value="preferences"
              className="gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg"
            >
              <Palette className="w-4 h-4" />
              <span>Theme & Preferences</span>
            </TabsTrigger>
          </TabsList>

          {isPasswordChangeRequired && (
            <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-semibold px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Password change mandatory</span>
            </div>
          )}
        </div>

        {/* Tab 1: Profile */}
        <TabsContent value="profile" className="mt-0 focus-visible:outline-none">
          <ProfileSection user={user} />
        </TabsContent>

        {/* Tab 2: Security */}
        <TabsContent value="security" className="mt-0 focus-visible:outline-none">
          <SecuritySection user={user} />
        </TabsContent>

        {/* Tab 3: Preferences */}
        <TabsContent value="preferences" className="mt-0 focus-visible:outline-none">
          <PreferencesSection user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Setting;
