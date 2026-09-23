/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Eye,
  EyeOff,
  ShieldCheck,
  KeyRound,
  AlertTriangle,
  Loader2,
  CheckCircle2,
  Lock,
  ShieldAlert,
} from 'lucide-react';
import { toast } from 'sonner';
import { IUserProfile } from '@/types/user.inteface';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { changeMyPassword } from '@/app/services/auth/changePassword';
import { Badge } from '@/components/ui/badge';
import { PasswordFormValues, passwordSchema } from '@/zod/user.validation';

interface SecuritySectionProps {
  user: IUserProfile;
}

const SecuritySection = ({ user }: SecuritySectionProps) => {
  const isPasswordChangeRequired = user?.needPasswordChange;

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
  });

  const watchNewPassword = watch('newPassword') || '';
  const watchConfirmPassword = watch('confirmPassword') || '';

  // Password rules checklist
  const hasMinLength = watchNewPassword.length >= 6;
  const hasUppercase = /[A-Z]/.test(watchNewPassword);
  const hasNumber = /[0-9]/.test(watchNewPassword);
  const passwordsMatch =
    watchNewPassword.length > 0 &&
    watchNewPassword === watchConfirmPassword;

  const onSubmit = async (data: PasswordFormValues) => {
    setLoading(true);
    try {
      const res = await changeMyPassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });

      if (res?.success) {
        toast.success(res.message || 'Password changed successfully!');
        reset();
        if (isPasswordChangeRequired) {
          window.location.reload();
        }
      } else {
        toast.error(res?.message || 'Failed to update password');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Status Alert if Password Change Required */}
      {isPasswordChangeRequired && (
        <Alert
          variant="destructive"
          className="bg-warning/10 border-warning/40 text-warning-foreground shadow-sm rounded-xl"
        >
          <AlertTriangle className="h-5 w-5 text-warning shrink-0" />
          <div className="ml-2">
            <AlertTitle className="font-bold text-sm text-foreground flex items-center gap-2">
              Action Required: Update Temporary Password
            </AlertTitle>
            <AlertDescription className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              Your account is currently using temporary or system-generated credentials. Please update your password immediately to protect your account.
            </AlertDescription>
          </div>
        </Alert>
      )}

      <Card className="border border-border/80 shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/20 border-b border-border/50 pb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-foreground">
                  Password & Authentication
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Change your password to keep your account safe and secure.
                </CardDescription>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isPasswordChangeRequired ? (
                <Badge
                  variant="outline"
                  className="bg-amber-500/10 text-amber-600 border-amber-500/30 gap-1.5 font-bold py-1 px-3 text-xs"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Action Required
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 gap-1.5 font-bold py-1 px-3 text-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Account Secured
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
                {/* Current Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="oldPassword" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Current Password
                  </Label>
                  <div className="relative">
                    <Input
                      {...register('oldPassword')}
                      id="oldPassword"
                      type={showCurrent ? 'text' : 'password'}
                      placeholder="Enter current password"
                      className={`h-10 pr-10 bg-background text-sm ${
                        errors.oldPassword
                          ? 'border-destructive focus-visible:ring-destructive'
                          : 'border-border/80'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                    >
                      {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.oldPassword && (
                    <p className="text-xs text-destructive font-medium">
                      {errors.oldPassword.message}
                    </p>
                  )}
                </div>

                {/* New Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="newPassword" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      {...register('newPassword')}
                      id="newPassword"
                      type={showNew ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      className={`h-10 pr-10 bg-background text-sm ${
                        errors.newPassword
                          ? 'border-destructive focus-visible:ring-destructive'
                          : 'border-border/80'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                    >
                      {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-xs text-destructive font-medium">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Input
                      {...register('confirmPassword')}
                      id="confirmPassword"
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="Re-enter new password"
                      className={`h-10 pr-10 bg-background text-sm ${
                        errors.confirmPassword
                          ? 'border-destructive focus-visible:ring-destructive'
                          : 'border-border/80'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-destructive font-medium">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="pt-3">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-10 px-6 font-semibold gap-2 shadow-sm min-w-[160px]"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <KeyRound size={16} />
                    )}
                    {loading ? 'Updating Password...' : 'Save New Password'}
                  </Button>
                </div>
              </form>
            </div>

            {/* Checklist & Best Practices Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-muted/30 border border-border/60 space-y-3.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  Password Requirements
                </h4>

                <ul className="space-y-2.5 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2.5">
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors ${
                        hasMinLength
                          ? 'bg-emerald-500 text-white'
                          : 'bg-muted-foreground/20 text-transparent'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                    <span className={hasMinLength ? 'text-foreground font-medium' : ''}>
                      At least 6 characters in length
                    </span>
                  </li>

                  <li className="flex items-center gap-2.5">
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors ${
                        hasUppercase
                          ? 'bg-emerald-500 text-white'
                          : 'bg-muted-foreground/20 text-transparent'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                    <span className={hasUppercase ? 'text-foreground font-medium' : ''}>
                      At least one uppercase letter (A–Z)
                    </span>
                  </li>

                  <li className="flex items-center gap-2.5">
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors ${
                        hasNumber
                          ? 'bg-emerald-500 text-white'
                          : 'bg-muted-foreground/20 text-transparent'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                    <span className={hasNumber ? 'text-foreground font-medium' : ''}>
                      At least one numeric digit (0–9)
                    </span>
                  </li>

                  <li className="flex items-center gap-2.5">
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors ${
                        passwordsMatch
                          ? 'bg-emerald-500 text-white'
                          : 'bg-muted-foreground/20 text-transparent'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                    <span className={passwordsMatch ? 'text-foreground font-medium' : ''}>
                      New passwords match
                    </span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-primary/5 border border-primary/15 text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground block mb-1">
                  Security Tip:
                </span>
                Never share your portal credentials with anyone. EMS staff will never ask for your password via email or phone.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySection;
