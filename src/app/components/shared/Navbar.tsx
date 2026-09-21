'use client';

import { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Sparkles,
  ArrowUpRight,
  Home,
  LayoutDashboard,
  Info,
  Image as ImageIcon,
  PhoneCall,
  LogIn,
  GraduationCap,
  UserCheck,
  Sun,
  Moon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useUser';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

const Navbar = () => {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Detect when scroll passes hero section
  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById('hero-section');
      if (heroElement) {
        const heroBottom = heroElement.getBoundingClientRect().bottom;
        // Changes color as soon as hero scroll finishes (passes header ~80px)
        setIsPastHero(heroBottom <= 80);
      } else {
        setIsPastHero(window.scrollY > 80);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Auto-close on route / pathname change
  useEffect(() => {
    setOpenNavbar(false);
  }, [pathname]);

  // Close on desktop resize & Escape key
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpenNavbar(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenNavbar(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Gallery', href: '/gallery', icon: ImageIcon },
    { name: 'Contact', href: '/contact', icon: PhoneCall },
  ];

  const isLoggedIn = Boolean(
    user && (user.success || user.data || user.id || user.email || user.user)
  );

  return (
    <>
      {/* Outside Click / Backdrop Overlay */}
      {openNavbar && (
        <div
          onClick={() => setOpenNavbar(false)}
          className="fixed inset-0 z-40 bg-blue-950/30 backdrop-blur-xs lg:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}

      <header
        className={`fixed top-0 inset-x-0 z-50 pt-2 pb-2 sm:pt-3 sm:pb-3 px-3 sm:px-6 pointer-events-none transition-all duration-300 ${
          isPastHero ? 'backdrop-blur-md' : 'backdrop-blur-xs'
        }`}
      >
        <div
          className={`w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 rounded-full pointer-events-auto transition-all duration-300 ${
            isPastHero
              ? 'bg-slate-950/95 dark:bg-slate-950/95 text-white backdrop-blur-2xl border border-slate-800/90 shadow-[0_16px_40px_-5px_rgba(0,0,0,0.35)]'
              : 'bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white backdrop-blur-2xl border border-white/90 dark:border-slate-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.1)]'
          }`}
        >
          {/* Logo Section */}
          <Link
            href="/"
            onClick={() => setOpenNavbar(false)}
            className="group flex items-center gap-2.5 transition-transform duration-200 hover:opacity-95"
          >
            <div className="relative flex h-9.5 w-9.5 items-center justify-center rounded-xl bg-linear-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white shadow-md shadow-blue-500/25 ring-2 ring-white/20 group-hover:scale-105 transition-all">
              <GraduationCap className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span
                className={`text-lg font-extrabold tracking-tight transition-colors duration-300 ${
                  isPastHero ? 'text-white' : 'text-slate-900 dark:text-white'
                }`}
              >
                EMS School
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className={`hidden lg:flex items-center gap-1 p-1 rounded-full transition-colors duration-300 ${
              isPastHero
                ? 'bg-slate-900/90 border border-slate-800'
                : 'bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60'
            }`}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-1.5 text-xs lg:text-sm font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/30 font-bold'
                      : isPastHero
                      ? 'text-slate-300 hover:text-white hover:bg-slate-800/90'
                      : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-300 hover:bg-white/90 dark:hover:bg-slate-700/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Theme Switcher Toggle */}
            {mounted && (
              <button
                onClick={() =>
                  setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
                }
                title={resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                aria-label="Toggle Theme"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isPastHero
                    ? 'border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800'
                    : 'border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {resolvedTheme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400 animate-in zoom-in-50 duration-300" />
                ) : (
                  <Moon
                    className={`w-4 h-4 animate-in zoom-in-50 duration-300 ${
                      isPastHero ? 'text-slate-200' : 'text-slate-700'
                    }`}
                  />
                )}
              </button>
            )}

            {/* Dynamic Action Button: Dashboard if logged in, else Login */}
            {isLoggedIn ? (
              <Button
                size="sm"
                asChild
                className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-full px-5 h-9.5 shadow-md shadow-blue-500/25 transition-all hover:scale-105 cursor-pointer"
              >
                <Link href="/dashboard" className="flex items-center gap-1.5">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-90" />
                </Link>
              </Button>
            ) : (
              <Button
                size="sm"
                asChild
                className="bg-linear-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-full px-5 h-9.5 shadow-md shadow-blue-500/25 transition-all hover:scale-105 cursor-pointer"
              >
                <Link href="/login" className="flex items-center gap-1.5">
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-90" />
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu & Action Toggle */}
          <div className="lg:hidden flex items-center gap-1.5">
            {mounted && (
              <button
                onClick={() =>
                  setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
                }
                title="Toggle Theme"
                aria-label="Toggle Theme"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isPastHero
                    ? 'border border-slate-700 bg-slate-900 text-slate-200'
                    : 'border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {resolvedTheme === 'dark' ? (
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Moon
                    className={`w-3.5 h-3.5 ${
                      isPastHero ? 'text-slate-200' : 'text-slate-700'
                    }`}
                  />
                )}
              </button>
            )}

            {/* Mobile Top Action Button */}
            {isLoggedIn ? (
              <Button
                size="sm"
                asChild
                className="bg-linear-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold h-8 px-3 rounded-full"
              >
                <Link href="/dashboard" onClick={() => setOpenNavbar(false)}>
                  Dashboard
                </Link>
              </Button>
            ) : (
              <Button
                size="sm"
                asChild
                className="bg-linear-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold h-8 px-3.5 rounded-full shadow-xs"
              >
                <Link href="/login" onClick={() => setOpenNavbar(false)}>
                  Login
                </Link>
              </Button>
            )}

            <button
              onClick={() => setOpenNavbar(!openNavbar)}
              aria-label="Toggle navigation"
              className={`p-1.5 rounded-full transition-colors focus:outline-none ${
                isPastHero
                  ? 'text-white hover:bg-white/10'
                  : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {openNavbar ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 pointer-events-auto max-w-7xl mx-auto ${
            openNavbar ? 'max-h-[500px] mt-2 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div
            className={`backdrop-blur-2xl rounded-3xl p-4 shadow-xl border space-y-1.5 transition-colors duration-300 ${
              isPastHero
                ? 'bg-slate-950/95 text-white border-slate-800'
                : 'bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white border-slate-200/80 dark:border-slate-800'
            }`}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpenNavbar(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-600 dark:text-sky-300 font-bold'
                      : isPastHero
                      ? 'text-slate-300 hover:bg-slate-900 hover:text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent
                      size={18}
                      className={isActive ? 'text-blue-600 dark:text-sky-400' : 'text-slate-400 dark:text-slate-500'}
                    />
                    <span>{link.name}</span>
                  </div>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-sky-400" />
                  )}
                </Link>
              );
            })}

            <div className={`h-px my-2 ${isPastHero ? 'bg-slate-800' : 'bg-slate-100 dark:bg-slate-800'}`} />

            {/* Mobile Bottom Action */}
            <div className="pt-1">
              {isLoggedIn ? (
                <Button
                  size="sm"
                  asChild
                  className="w-full rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold h-10 shadow-md shadow-blue-500/25 cursor-pointer"
                >
                  <Link
                    href="/dashboard"
                    onClick={() => setOpenNavbar(false)}
                    className="flex items-center justify-center gap-1.5"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Go to Dashboard</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              ) : (
                <Button
                  size="sm"
                  asChild
                  className="w-full rounded-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-sky-600 text-white font-bold h-10 shadow-md shadow-blue-500/25 cursor-pointer"
                >
                  <Link
                    href="/login"
                    onClick={() => setOpenNavbar(false)}
                    className="flex items-center justify-center gap-1.5"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
