import AppSidebar from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 60)',
          '--header-height': 'calc(var(--spacing) * 14)',
        } as React.CSSProperties
      }
      className="min-h-screen w-full"
    >
      <AppSidebar />
      <SidebarInset className="flex flex-col min-h-screen !bg-slate-50/90 dark:!bg-slate-950/70">
        <SiteHeader />
        <main className="flex-1 p-4 md:p-6 w-full max-w-7xl mx-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
