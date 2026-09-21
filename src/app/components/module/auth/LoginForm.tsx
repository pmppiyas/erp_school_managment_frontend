'use client';

import { loginSchema } from '@/app/components/module/auth/schema';
import { loginUser } from '@/app/services/auth/login';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/hooks/useUser';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Loader2,
  Shield,
  GraduationCap,
  User,
  Sparkles,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { env } from '@/config/env';

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  redirect?: string;
  initialEmail?: string;
  initialPassword?: string;
}

const demoAccounts = [
  {
    role: 'Admin',
    label: 'অ্যাডমিন',
    email: env.admin.email,
    password: env.admin.password,
    icon: Shield,
    badgeBg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300',
    selectedRing:
      'border-blue-600 bg-blue-50/80 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 ring-2 ring-blue-500/40',
  },
  {
    role: 'Teacher',
    label: 'শিক্ষক',
    email: env.teacher.email,
    password: env.teacher.password,
    icon: GraduationCap,
    badgeBg:
      'bg-purple-50 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300',
    selectedRing:
      'border-purple-600 bg-purple-50/80 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300 ring-2 ring-purple-500/40',
  },
  {
    role: 'Student',
    label: 'শিক্ষার্থী',
    email: env.student.email,
    password: env.student.password,
    icon: User,
    badgeBg:
      'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300',
    selectedRing:
      'border-emerald-600 bg-emerald-50/80 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 ring-2 ring-emerald-500/40',
  },
];

const LoginForm = ({
  redirect,
  initialEmail = '',
  initialPassword = '',
}: LoginFormProps) => {
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useUser();

  const queryEmail = searchParams.get('email') || initialEmail || '';
  const queryPassword = searchParams.get('password') || initialPassword || '';

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: queryEmail,
      password: queryPassword,
    },
  });

  const currentEmail = watch('email');

  useEffect(() => {
    if (queryEmail) {
      setValue('email', queryEmail, { shouldValidate: true });
    }
    if (queryPassword) {
      setValue('password', queryPassword, { shouldValidate: true });
    }
  }, [queryEmail, queryPassword, setValue]);

  const handleSelectRole = (email: string, pass: string, roleName: string) => {
    setValue('email', email, { shouldValidate: true });
    setValue('password', pass, { shouldValidate: true });
    toast.info(`${roleName} ডেমো সিলেক্ট করা হয়েছে`);
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      const login = await loginUser(data);

      if (login.success) {
        toast.success(login.message || 'সফলভাবে লগইন হয়েছে!');
        setIsRedirecting(true);

        await refreshUser();
        router.refresh();

        const destination =
          redirect && redirect !== '/'
            ? decodeURIComponent(redirect)
            : '/dashboard';
        router.push(destination);
      } else {
        toast.error(login.message || 'ভুল ইমেইল বা পাসওয়ার্ড প্রদান করা হয়েছে');
        setLoading(false);
      }
    } catch (err) {
      toast.error('লগইন প্রক্রিয়ায় ত্রুটি হয়েছে');
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-xl mx-auto border-border/70 bg-card/95 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300">
      {/* Top Gradient Stripe */}
      <div className="h-1 w-full bg-linear-to-r from-blue-600 via-indigo-600 to-sky-500" />

      <CardHeader className="space-y-1 text-center px-4 sm:px-6 pt-4 pb-2">
        <div className="inline-flex items-center justify-center gap-1 px-2.5 py-0.5 mx-auto rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/70 dark:border-blue-800/60 text-[10px] font-semibold text-blue-700 dark:text-blue-300">
          <Sparkles className="w-3 h-3 text-blue-500" />
          <span>নিরাপদ সিস্টেম পোর্টাল</span>
        </div>
        <CardTitle className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
          লগইন করুন
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          আপনার অ্যাকাউন্টে প্রবেশ করতে ক্রেডেনশিয়াল দিন
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 px-4 sm:px-6">
        {/* Quick Demo Role Selector (Compact) */}
        <div className="space-y-1.5 p-2 rounded-xl bg-muted/40 border border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-500" />
              <span>ওয়ান-ক্লিক ডেমো অ্যাকাউন্ট:</span>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {demoAccounts.map((account) => {
              const Icon = account.icon;
              const isSelected = currentEmail === account.email;
              return (
                <button
                  key={account.role}
                  type="button"
                  onClick={() =>
                    handleSelectRole(
                      account.email,
                      account.password,
                      account.label
                    )
                  }
                  className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg border text-[11px] font-bold transition-all cursor-pointer ${
                    isSelected
                      ? account.selectedRing
                      : 'border-border/80 bg-card text-foreground hover:bg-muted/80 shadow-2xs'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 mb-0.5 shrink-0" />
                  <span>{account.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Demo Auto-filled Banner (Compact) */}
        {queryEmail && (
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-[11px] text-blue-700 dark:text-blue-300 flex items-center gap-2 shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-medium">
              ডেমো তথ্য লোড হয়েছে! সরাসরি লগইন চাপুন।
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2.5">
          {/* Email Input */}
          <div className="space-y-1">
            <Label htmlFor="email" className="text-[11px] font-semibold text-foreground">
              ইমেইল অ্যাড্রেস
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="admin@gmail.com"
                {...register('email')}
                disabled={loading}
                className="pl-9 h-9 rounded-lg text-xs sm:text-sm border-border bg-background/80 focus-visible:ring-1.5 focus-visible:ring-blue-500"
              />
            </div>
            {errors.email && (
              <p className="text-destructive text-[10px] font-medium pl-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-[11px] font-semibold text-foreground">
                পাসওয়ার্ড
              </Label>
              <Link
                href="/forgot-password"
                className="text-[10px] text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline font-medium"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('password')}
                disabled={loading}
                className="pl-9 pr-9 h-9 rounded-lg text-xs sm:text-sm border-border bg-background/80 focus-visible:ring-1.5 focus-visible:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 transition-colors cursor-pointer"
                title={showPassword ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}
              >
                {showPassword ? (
                  <EyeOff className="w-3.5 h-3.5" />
                ) : (
                  <Eye className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-destructive text-[10px] font-medium pl-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="sm"
            className="w-full mt-1 rounded-lg font-bold text-xs sm:text-sm h-9.5 sm:h-10 shadow-sm shadow-blue-500/20 bg-linear-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:via-indigo-700 hover:to-sky-700 text-white transition-all transform active:scale-[0.99] cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-1.5">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>{isRedirecting ? 'ড্যাশবোর্ডে যাচ্ছে...' : 'লগইন হচ্ছে...'}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1.5">
                <span>লগইন করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-1 pt-1.5 pb-3 px-4 sm:px-6 border-t border-border/50 text-center">
        <p className="text-[10px] sm:text-[11px] text-muted-foreground">
          নতুন অ্যাকাউন্টের জন্য প্রতিষ্ঠানের সাথে{' '}
          <Link
            href="/contact"
            className="text-primary font-bold hover:underline"
          >
            যোগাযোগ করুন
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
