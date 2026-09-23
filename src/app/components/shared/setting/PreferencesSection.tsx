/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sun,
  Moon,
  Laptop,
  Check,
  Copy,
  Shield,
  Palette,
  Info,
  Key,
} from 'lucide-react';
import { IUserProfile } from '@/types/user.inteface';
import { toast } from 'sonner';

interface PreferencesSectionProps {
  user: IUserProfile;
}

const PreferencesSection = ({ user }: PreferencesSectionProps) => {
  const { theme, setTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    if (!user?.id) return;
    navigator.clipboard.writeText(user.id);
    setCopied(true);
    toast.success('User ID copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const themeOptions = [
    {
      id: 'light',
      label: 'Light Mode',
      description: 'Clean, bright interface optimized for daylight',
      icon: Sun,
    },
    {
      id: 'dark',
      label: 'Dark Mode',
      description: 'Gentle on the eyes in low light environments',
      icon: Moon,
    },
    {
      id: 'system',
      label: 'System Preference',
      description: 'Syncs automatically with your operating system',
      icon: Laptop,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Theme Appearance Card */}
      <Card className="border border-border/70 shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/20 border-b border-border/50 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Appearance & Theme</CardTitle>
              <CardDescription>
                Customize how the EMS School Portal looks on your device.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themeOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = theme === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTheme(opt.id)}
                  className={`relative flex flex-col text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-sm ring-2 ring-primary/20'
                      : 'border-border/60 hover:border-border hover:bg-muted/30'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <div
                      className={`p-2.5 rounded-lg ${
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <h4 className="font-semibold text-sm text-foreground mb-1">
                    {opt.label}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {opt.description}
                  </p>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Account Info Card */}
      <Card className="border border-border/70 shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/20 border-b border-border/50 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Account & System Info</CardTitle>
              <CardDescription>
                System identifiers and security metadata associated with this session.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* User ID */}
            <div className="space-y-1.5 p-3.5 rounded-xl bg-muted/30 border border-border/40">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Account ID
              </span>
              <div className="flex items-center justify-between gap-2">
                <code className="text-xs font-mono text-foreground truncate max-w-[170px]">
                  {user?.id || '—'}
                </code>
                {user?.id && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-muted-foreground hover:text-foreground"
                    onClick={handleCopyId}
                    title="Copy ID"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Role & Access */}
            <div className="space-y-1.5 p-3.5 rounded-xl bg-muted/30 border border-border/40">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Access Level
              </span>
              <div className="flex items-center gap-2 pt-0.5">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold capitalize text-foreground">
                  {user?.role?.toLowerCase() || 'Standard'} Portal
                </span>
              </div>
            </div>

            {/* Account Status */}
            <div className="space-y-1.5 p-3.5 rounded-xl bg-muted/30 border border-border/40">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Account State
              </span>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <Badge
                  variant="outline"
                  className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-xs font-semibold py-0"
                >
                  {user?.status || 'ACTIVE'}
                </Badge>
              </div>
            </div>

            {/* Email Verified */}
            <div className="space-y-1.5 p-3.5 rounded-xl bg-muted/30 border border-border/40">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Email Authentication
              </span>
              <div className="flex items-center gap-2 pt-0.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-medium text-foreground truncate">
                  {user?.email}
                </span>
              </div>
            </div>

            {/* Password Policy */}
            <div className="space-y-1.5 p-3.5 rounded-xl bg-muted/30 border border-border/40">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Password Status
              </span>
              <div className="flex items-center gap-2 pt-0.5">
                <Key className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-foreground">
                  {user?.needPasswordChange ? (
                    <span className="text-warning font-semibold">Change Required</span>
                  ) : (
                    <span className="text-emerald-600 font-semibold">Verified & Active</span>
                  )}
                </span>
              </div>
            </div>

            {/* Member Since */}
            <div className="space-y-1.5 p-3.5 rounded-xl bg-muted/30 border border-border/40">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Registration Date
              </span>
              <p className="text-xs font-medium text-foreground pt-0.5">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  : 'Active'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreferencesSection;
