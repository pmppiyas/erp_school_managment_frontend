import { GraduationCap } from 'lucide-react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
  onClick?: () => void;
  collapsed?: boolean;
}

export const Logo = ({
  className = '',
  variant = 'auto',
  onClick,
  collapsed = false,
}: LogoProps) => {
  const textClass =
    variant === 'light'
      ? 'text-white'
      : variant === 'dark'
        ? 'text-slate-900'
        : 'text-slate-900 dark:text-white';

  return (
    <Link
      href="/"
      onClick={onClick}
      className={`group flex items-center gap-2.5 transition-transform duration-200 hover:opacity-95 ${className}`}
    >
      {/* Icon Badge */}
      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 text-white shadow-md shadow-blue-500/25 ring-1 ring-white/20 group-hover:scale-105 transition-all">
        <GraduationCap className="h-4.5 w-4.5" />
        <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      </div>

      {/* Brand Name */}
      {!collapsed && (
        <div className="flex items-center gap-1.5 overflow-hidden">
          <span
            className={`text-base font-extrabold tracking-tight whitespace-nowrap ${textClass}`}
          >
            EMS School
          </span>
          <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            ERP
          </span>
        </div>
      )}
    </Link>
  );
};

export default Logo;