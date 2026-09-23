import NavLinkClient from '@/app/components/module/dashboard/NavlinkClient';
import Logo from '@/app/components/shared/Logo';
import { getUserInfo } from '@/app/services/auth/userInfo';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { getRoutesByRole } from '@/routes/routes';

export default async function AppSidebar() {
  const user = await getUserInfo();

  if (!user) {
    return null;
  }

  const roleSections = getRoutesByRole(user.role);

  return (
    <Sidebar
      collapsible="offcanvas"
      className="border-r border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900"
    >
      {/* Header height matches top navbar (h-14) for unified grid line */}
      <SidebarHeader className="flex h-14 items-center justify-between border-b border-slate-200/90 dark:border-slate-800 px-4">
        <Logo />
      </SidebarHeader>

      <SidebarContent className="px-2 py-3 space-y-3 custom-scrollbar">
        {roleSections.map((section, idx) => (
          <SidebarGroup key={idx} className="p-0">
            {section.title && (
              <SidebarGroupLabel className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                {section.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="space-y-0.5">
                {section.nav.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <NavLinkClient
                      href={item.href}
                      title={item.title}
                      iconName={item.iconName || ''}
                    />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200/90 dark:border-slate-800 p-3 bg-slate-50/70 dark:bg-slate-900/70">
        <NavUser user={user ?? null} />
      </SidebarFooter>
    </Sidebar>
  );
}
