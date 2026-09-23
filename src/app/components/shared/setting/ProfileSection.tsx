/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IUserProfile } from '@/types/user.inteface';
import {
  MapPin,
  Phone,
  Mail,
  Briefcase,
  Calendar,
  User as UserIcon,
  Pencil,
  Check,
  X,
  Loader2,
  GraduationCap,
  Hash,
  Camera,
  Copy,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import ProfileFormDialog from '@/app/components/shared/setting/ProfileFormDialog';
import { changeEmail } from '@/app/services/auth/changeEmail';
import { IAdmin } from '@/types/admin.interface';
import { ITeacher } from '@/types/teacher.interface';

interface ProfileSectionProps {
  user: IUserProfile;
}

const ProfileSection = ({ user }: ProfileSectionProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const isStudent = user?.role === 'STUDENT';
  const isTeacher = user?.role === 'TEACHER';
  const isAdmin = user?.role === 'ADMIN';

  const className = (user as any)?.class?.name;
  const roll = (user as any)?.roll;
  const designation = (user as IAdmin | ITeacher)?.designation;
  const dateOfBirth = (user as any)?.dateOfBirth;

  const handleCopyEmail = () => {
    if (!user?.email) return;
    navigator.clipboard.writeText(user.email);
    setCopiedEmail(true);
    toast.success('Email copied to clipboard');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleEmailUpdate = async () => {
    if (!newEmail || newEmail.trim() === '') {
      toast.error('Email cannot be empty');
      return;
    }
    if (newEmail.trim() === user?.email) {
      setIsEditingEmail(false);
      return;
    }
    setLoading(true);
    try {
      const res = await changeEmail(newEmail.trim());
      if (res?.success) {
        toast.success(res.message || 'Email updated successfully');
        setIsEditingEmail(false);
      } else {
        toast.error(res?.message || 'Failed to update email');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="overflow-hidden border border-border/80 bg-card shadow-sm">
        {/* Banner with subtle abstract mesh */}
        <div className="h-36 sm:h-44 bg-gradient-to-r from-primary/20 via-primary/10 to-indigo-500/10 border-b border-border/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-primary/25 via-transparent to-transparent" />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-background/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-muted-foreground border border-border/40 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>EMS Portal Member</span>
          </div>
        </div>

        <CardContent className="relative pt-0 px-5 sm:px-8 pb-8">
          {/* Avatar and Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 -mt-16 sm:-mt-20 mb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
              {/* Avatar with edit overlay */}
              <div className="relative group cursor-pointer" onClick={() => setIsDialogOpen(true)}>
                <Avatar className="h-28 w-28 sm:h-32 sm:w-32 ring-4 ring-card shadow-xl border border-border/40">
                  <AvatarImage
                    src={user?.photo || undefined}
                    alt={user?.firstName}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
                    {user?.firstName?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Camera className="w-6 h-6 drop-shadow-md" />
                </div>
              </div>

              {/* Identity & Badges */}
              <div className="space-y-1.5 pb-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    {user?.firstName} {user?.lastName}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-0.5">
                  {/* Role Badge */}
                  {isStudent && (
                    <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 font-semibold gap-1.5 py-0.5 shadow-none">
                      <GraduationCap className="w-3.5 h-3.5" />
                      Student
                    </Badge>
                  )}
                  {isTeacher && (
                    <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 font-semibold gap-1.5 py-0.5 shadow-none">
                      <Briefcase className="w-3.5 h-3.5" />
                      Teacher
                    </Badge>
                  )}
                  {isAdmin && (
                    <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 font-semibold gap-1.5 py-0.5 shadow-none">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Administrator
                    </Badge>
                  )}

                  {/* Student Class / Roll Badge */}
                  {isStudent && className && (
                    <Badge variant="outline" className="font-semibold bg-muted/50 border-border/80">
                      {className}
                    </Badge>
                  )}
                  {isStudent && roll !== undefined && (
                    <Badge variant="outline" className="font-semibold bg-muted/50 border-border/80">
                      Roll #{roll}
                    </Badge>
                  )}

                  {/* Teacher / Admin Designation Badge */}
                  {(isTeacher || isAdmin) && designation && (
                    <Badge variant="outline" className="font-semibold bg-muted/50 border-border/80">
                      {designation}
                    </Badge>
                  )}

                  {/* Active Status Badge */}
                  <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 font-semibold py-0.5 shadow-none flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active Account
                  </Badge>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center sm:justify-end">
              <Button
                onClick={() => setIsDialogOpen(true)}
                variant="outline"
                className="gap-2 h-10 px-5 font-semibold shadow-xs border-border/80 hover:bg-muted/60"
              >
                <Pencil className="w-4 h-4 text-primary" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Left Card: Contact & Personal Details */}
            <div className="p-5 rounded-2xl bg-muted/20 border border-border/60 space-y-4">
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-primary" />
                  Personal & Contact Information
                </span>
              </div>

              <div className="space-y-3.5">
                {/* Email Field with Inline Edit */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-background border border-border/60 rounded-xl text-primary mt-0.5 shadow-2xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight">
                      Email Address
                    </p>
                    {isEditingEmail ? (
                      <div className="flex items-center gap-2 mt-1.5">
                        <Input
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          className="h-8 text-sm focus-visible:ring-primary w-full max-w-[240px] bg-background"
                          disabled={loading}
                          autoFocus
                          placeholder="name@example.com"
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                          onClick={handleEmailUpdate}
                          disabled={loading}
                        >
                          {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Check className="w-4 h-4 stroke-[2.5]" />
                          )}
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          onClick={() => {
                            setIsEditingEmail(false);
                            setNewEmail(user?.email || '');
                          }}
                          disabled={loading}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mt-0.5 group">
                        <span className="text-sm font-medium text-foreground truncate">
                          {user?.email || '—'}
                        </span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setIsEditingEmail(true)}
                            title="Edit email"
                            className="p-1 text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                          >
                            <Pencil className="w-3 h-3" />
                          </button>
                          <button
                            onClick={handleCopyEmail}
                            title="Copy email"
                            className="p-1 text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                          >
                            {copiedEmail ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-background border border-border/60 rounded-xl text-primary mt-0.5 shadow-2xs">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight">
                      Contact Phone
                    </p>
                    <p className="text-sm font-medium text-foreground mt-0.5">
                      {user?.phoneNumber || 'Not provided'}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-background border border-border/60 rounded-xl text-primary mt-0.5 shadow-2xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight">
                      Residential Address
                    </p>
                    <p className="text-sm font-medium text-foreground mt-0.5">
                      {user?.address || 'Not provided'}
                    </p>
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-background border border-border/60 rounded-xl text-primary mt-0.5 shadow-2xs">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight">
                      Date of Birth
                    </p>
                    <p className="text-sm font-medium text-foreground mt-0.5">
                      {dateOfBirth
                        ? new Date(dateOfBirth).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'Not specified'}
                    </p>
                  </div>
                </div>

                {/* Gender */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-background border border-border/60 rounded-xl text-primary mt-0.5 shadow-2xs">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight">
                      Gender
                    </p>
                    <p className="text-sm font-medium text-foreground capitalize mt-0.5">
                      {user?.gender?.toLowerCase() || 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: Academic / Institutional Details */}
            <div className="p-5 rounded-2xl bg-muted/20 border border-border/60 space-y-4">
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  {isStudent ? (
                    <>
                      <GraduationCap className="w-4 h-4 text-primary" />
                      Academic & Enrollment Details
                    </>
                  ) : (
                    <>
                      <Briefcase className="w-4 h-4 text-primary" />
                      Professional & Faculty Details
                    </>
                  )}
                </span>
              </div>

              <div className="space-y-3.5">
                {/* Student specific fields */}
                {isStudent && (
                  <>
                    <div className="flex items-start gap-3.5">
                      <div className="p-2 bg-background border border-border/60 rounded-xl text-primary mt-0.5 shadow-2xs">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight">
                          Assigned Class
                        </p>
                        <p className="text-sm font-semibold text-foreground mt-0.5">
                          {className || 'General Section'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="p-2 bg-background border border-border/60 rounded-xl text-primary mt-0.5 shadow-2xs">
                        <Hash className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight">
                          Class Roll Number
                        </p>
                        <p className="text-sm font-semibold text-foreground mt-0.5">
                          {roll !== undefined ? `#${roll}` : 'Unassigned'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="p-2 bg-background border border-border/60 rounded-xl text-primary mt-0.5 shadow-2xs">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight">
                          Academic Session
                        </p>
                        <p className="text-sm font-medium text-foreground mt-0.5">
                          2026 Academic Year
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {/* Teacher / Admin specific fields */}
                {(isTeacher || isAdmin) && (
                  <>
                    <div className="flex items-start gap-3.5">
                      <div className="p-2 bg-background border border-border/60 rounded-xl text-primary mt-0.5 shadow-2xs">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight">
                          Designation
                        </p>
                        <p className="text-sm font-semibold text-foreground capitalize mt-0.5">
                          {designation || (isAdmin ? 'Head Administrator' : 'Faculty Member')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="p-2 bg-background border border-border/60 rounded-xl text-primary mt-0.5 shadow-2xs">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight">
                          System Role
                        </p>
                        <p className="text-sm font-medium text-foreground capitalize mt-0.5">
                          {user?.role?.toLowerCase()} Privilege
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {/* Joined / Registration Date */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-background border border-border/60 rounded-xl text-primary mt-0.5 shadow-2xs">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight">
                      Enrollment / Registration Date
                    </p>
                    <p className="text-sm font-medium text-foreground mt-0.5">
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : 'Active Session'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProfileFormDialog
        open={isDialogOpen}
        onSuccess={() => setIsDialogOpen(false)}
        onClose={() => setIsDialogOpen(false)}
        user={user}
      />
    </>
  );
};

export default ProfileSection;
