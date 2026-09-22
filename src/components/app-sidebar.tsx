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
    <Sidebar collapsible="offcanvas" className="border-r border-border/40">
      <SidebarHeader className="border-b border-border/40 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <Logo />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {roleSections.map((section, idx) => (
          <SidebarGroup key={idx} className="mb-4 last:mb-0">
            {section.title && (
              <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-2">
                {section.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="px-2 space-y-1">
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

      <SidebarFooter className="border-t border-border/40 p-4">
        <NavUser user={user ?? null} />
      </SidebarFooter>
    </Sidebar>
  );
}
