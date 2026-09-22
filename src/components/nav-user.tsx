'use client';

import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useUser } from '@/hooks/useUser';
import { logout } from '../app/services/auth/logout';
import { env } from '@/config/env';
import Link from 'next/link';
import {
  Home,
  LifeBuoy,
  LogOut,
  ChevronsUpDown,
} from 'lucide-react';

export function NavUser({
  user: initialUser,
}: {
  user?: {
    id?: string;
    email?: string;
    role?: string;
  } | null;
}) {
  const { isMobile } = useSidebar();
  const { user: contextUser } = useUser();

  const user = contextUser || initialUser;

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

  const displayName = user?.name || user?.email?.split('@')[0] || 'User';
  const displayEmail = user?.email || 'user@example.com';
  const initials = displayName.slice(0, 2).toUpperCase();
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
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/80 transition-colors rounded-xl px-2.5 py-2 border border-slate-200/70 dark:border-slate-800 bg-white/70 dark:bg-slate-800/40"
            >
              <Avatar className="h-8 w-8 rounded-lg ring-1 ring-border">
                <AvatarImage
                  src={user?.photoUrl || user?.avatar}
                  alt={displayName}
                />
                <AvatarFallback className="rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight ml-1">
                <span className="truncate font-semibold text-slate-800 dark:text-slate-100 text-xs">
                  {displayName}
                </span>
                <span className="truncate text-[10px] text-muted-foreground mt-0.5">
                  {displayEmail}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-muted-foreground/70" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl p-1.5 shadow-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={6}
          >
            <DropdownMenuLabel className="p-2 font-normal">
              <div className="flex items-center gap-2.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg ring-1 ring-border">
                  <AvatarImage
                    src={user?.photoUrl || user?.avatar}
                    alt={displayName}
                  />
                  <AvatarFallback className="rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-foreground text-xs">
                    {displayName}
                  </span>
                  <span className="text-muted-foreground truncate text-[11px]">
                    {displayEmail}
                  </span>
                  <div className="mt-1">
                    <span
                      className={`inline-block text-[9px] font-semibold uppercase tracking-wider rounded px-1.5 py-0.5 border ${roleBadgeStyle}`}
                    >
                      {role}
                    </span>
                  </div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={visitSiteUrl} target="_blank" className="cursor-pointer">
                  <Home className="mr-2 h-4 w-4 text-blue-600" />
                  <span>Visit Main Website</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={supportUrl} target="_blank" className="cursor-pointer">
                  <LifeBuoy className="mr-2 h-4 w-4 text-indigo-600" />
                  <span>Help & Support</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
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
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
