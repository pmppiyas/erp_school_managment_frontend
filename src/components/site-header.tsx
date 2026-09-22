'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/hooks/useUser';
import { logout } from '@/app/services/auth/logout';
import { env } from '@/config/env';
import { toast } from 'sonner';
import { Sun, Moon, Home, LifeBuoy, LogOut, ChevronRight } from 'lucide-react';

export function SiteHeader() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getBreadcrumbs = (): {
    label: string;
    href: string;
    isLast: boolean;
  }[] => {
    if (!pathname) return [{ label: 'Dashboard', href: '#', isLast: true }];

    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0)
      return [{ label: 'Dashboard', href: '#', isLast: true }];

    const formatSegment = (seg: string) => {
      const map: Record<string, string> = {
        admin: 'Admin',
        teacher: 'Teacher',
        student: 'Student',
        dashboard: 'Dashboard',
        teachers: 'Teachers',
        students: 'Students',
        attendance: 'Attendance',
        schedules: 'Schedules',
        result: 'Results',
        class: 'Classes',
        classtimes: 'Class Times',
        subject: 'Subjects',
        payments: 'Payments',
        feetype: 'Fee Types',
        generate: 'Documents',
        setting: 'Settings',
        manage: 'Management',
        helpline: 'Helpline',
        diary: 'Diary',
        my_profile: 'My Profile',
      };
      if (map[seg]) return map[seg];
      return seg.charAt(0).toUpperCase() + seg.slice(1).replace(/[-_]/g, ' ');
    };

    const getHref = (seg: string, idx: number) => {
      if (seg === 'admin') return '/admin/dashboard';
      if (seg === 'teacher') return '/teacher/dashboard';
      if (seg === 'student') return '/dashboard';
      return '/' + segments.slice(0, idx + 1).join('/');
    };

    return segments.map((seg, idx) => ({
      label: formatSegment(seg),
      href: getHref(seg, idx),
      isLast: idx === segments.length - 1,
    }));
  };

  const breadcrumbs = getBreadcrumbs();

  const handleLogout = async () => {
    try {
      const res = await logout();
      if (res?.success) {
        toast.success((res.message as string) || 'Logged out successfully');
        window.location.href = '/';
      } else {
        toast.error((res?.message as string) || 'Logout failed');
      }
    } catch (err) {
      console.error('Logout error:', err);
      window.location.href = '/';
    }
  };

  const userInitials = (user?.name || user?.email || 'U')
    .slice(0, 2)
    .toUpperCase();

  const role = user?.role || 'User';
  const roleBadgeStyle =
    role.toUpperCase() === 'ADMIN'
      ? 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400'
      : role.toUpperCase() === 'TEACHER'
        ? 'bg-purple-500/10 text-purple-600 border-purple-500/20 dark:bg-purple-500/20 dark:text-purple-400'
        : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400';

  const supportUrl = env.NEXT_PUBLIC_SUPPORT_URL;
  const visitSiteUrl = env.NEXT_PUBLIC_FRONTEND_URL;

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-slate-900/95 px-4 backdrop-blur-md shadow-xs shadow-slate-900/5 transition-[width,height] ease-linear lg:px-6">
      {/* Left: Sidebar Toggle & Dynamic Breadcrumbs */}
      <div className="flex items-center gap-2 overflow-hidden">
        <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
        <Separator
          orientation="vertical"
          className="mx-1 h-4 bg-border/60"
        />

        {/* Desktop Breadcrumbs */}
        <nav className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground overflow-hidden">
          <Link
            href={visitSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
            title="School ERP"
          >
            <Home className="h-3.5 w-3.5" />
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <div
              key={`${crumb.label}-${idx}`}
              className="flex items-center gap-1.5"
            >
              <ChevronRight className="h-3 w-3 text-muted-foreground/40 shrink-0" />
              {crumb.isLast ? (
                <span className="font-semibold text-foreground truncate max-w-[140px] md:max-w-[200px]">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:text-foreground transition-colors truncate max-w-[100px]"
                >
                  {crumb.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Page Title */}
        <div className="flex sm:hidden items-center gap-1.5">
          <span className="text-sm font-semibold text-foreground truncate max-w-[160px]">
            {breadcrumbs[breadcrumbs.length - 1]?.label || 'Dashboard'}
          </span>
        </div>
      </div>

      {/* Right: Actions (Website Link, Theme Toggle, Support, User Profile) */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Visit Live Website */}
        <Button
          variant="outline"
          size="sm"
          asChild
          className="hidden md:inline-flex h-8 px-2.5 text-xs font-medium bg-slate-50/80 dark:bg-slate-800/60 border-slate-200/90 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 gap-1.5 shadow-2xs"
        >
          <Link href={visitSiteUrl} target="_blank" rel="noopener noreferrer">
            <Home className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>Visit Site</span>
          </Link>
        </Button>

        {/* Need Support */}
        <Button
          variant="outline"
          size="sm"
          asChild
          className="hidden lg:inline-flex h-8 px-2.5 text-xs font-medium bg-slate-50/80 dark:bg-slate-800/60 border-slate-200/90 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 gap-1.5 shadow-2xs"
        >
          <Link href={supportUrl} target="_blank" rel="noopener noreferrer">
            <LifeBuoy className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Support</span>
          </Link>
        </Button>

        {/* Dark / Light Theme Toggle */}
        {mounted && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="size-8 aspect-square rounded-lg p-0 bg-slate-50/80 dark:bg-slate-800/60 border-slate-200/90 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-2xs shrink-0"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400 transition-transform" />
            ) : (
              <Moon className="h-4 w-4 transition-transform" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        )}

        <Separator
          orientation="vertical"
          className="mx-1 hidden sm:block h-4 bg-border/60"
        />

        {/* User Profile Pill & Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 h-8.5 px-2 bg-slate-50/80 dark:bg-slate-800/60 border-slate-200/90 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg shadow-2xs"
            >
              <Avatar className="h-6.5 w-6.5 rounded-full ring-1 ring-border">
                <AvatarImage
                  src={user?.photoUrl || user?.avatar}
                  alt={user?.name || 'User'}
                />
                <AvatarFallback className="text-[11px] font-bold bg-primary/10 text-primary">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-none truncate max-w-[110px]">
                  {user?.name || user?.email?.split('@')[0] || 'User'}
                </span>
                <span
                  className={`mt-0.5 inline-block text-[9px] font-semibold uppercase tracking-wider rounded px-1 py-0.2 border ${roleBadgeStyle} leading-tight self-start`}
                >
                  {role}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" sideOffset={6}>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none text-foreground">
                  {user?.name || 'Account'}
                </p>
                <p className="text-xs leading-none text-muted-foreground truncate">
                  {user?.email}
                </p>
                <div className="pt-1">
                  <span
                    className={`inline-block text-[10px] font-semibold uppercase tracking-wider rounded px-1.5 py-0.5 border ${roleBadgeStyle}`}
                  >
                    Role: {role}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={visitSiteUrl}
                target="_blank"
                className="cursor-pointer"
              >
                <Home className="mr-2 h-4 w-4" />
                <span>Visit Main Website</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={supportUrl}
                target="_blank"
                className="cursor-pointer"
              >
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
