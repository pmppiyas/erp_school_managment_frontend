/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import FieldError from '@/app/components/shared/FieldError';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { IUserProfile } from '@/types/user.inteface';
import { updateMe } from '@/app/services/user/updateMe';
import { Camera, Loader2, User, UploadCloud } from 'lucide-react';

interface IProfileFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: IUserProfile;
}

const ProfileFormDialog = ({
  open,
  onClose,
  onSuccess,
  user,
}: IProfileFormDialogProps) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState<string>(user?.gender || 'MALE');
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const [apiErrors, setApiErrors] = useState<
    { field: string; message: string }[] | null
  >(null);

  useEffect(() => {
    if (open) {
      setGender(user?.gender || 'MALE');
      setPreviewPhoto(user?.photo || null);
      setApiErrors(null);
    }
  }, [open, user]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      setPreviewPhoto(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (form: HTMLFormElement) => {
    setLoading(true);
    setApiErrors(null);

    try {
      const formData = new FormData(form);
      formData.set('gender', gender);

      const photoFile = formData.get('photo') as File;
      if (photoFile && photoFile.size === 0) {
        formData.delete('photo');
      }

      const response = await updateMe(formData);

      if (response?.success) {
        toast.success(response.message || 'Profile updated successfully');
        router.refresh();
        onSuccess();
        onClose();
      } else {
        setApiErrors(response?.errors || []);
        toast.error(response?.message || 'Update failed');
      }
    } catch (err: any) {
      toast.error(err.message || 'Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const userDob = (user as any)?.dateOfBirth;
  const formattedDob = userDob
    ? new Date(userDob).toISOString().split('T')[0]
    : '';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[92vw] max-w-xl max-h-[90vh] flex flex-col p-0 overflow-hidden border border-border/80 shadow-2xl rounded-2xl">
        <DialogHeader className="px-6 py-4.5 border-b border-border/60 bg-muted/20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <User className="w-4 h-4" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-foreground">
                Edit Profile Information
              </DialogTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Update your personal and contact details across the school portal.
              </p>
            </div>
          </div>
        </DialogHeader>

        <form
          className="flex flex-col flex-1 overflow-hidden"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e.currentTarget);
          }}
        >
          <div className="overflow-y-auto px-6 py-5 space-y-5 flex-1">
            {/* Photo Upload with Live Preview */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/25 border border-border/50">
              <div className="relative group shrink-0">
                <Avatar className="h-16 w-16 ring-2 ring-border/60 shadow-sm">
                  <AvatarImage
                    src={previewPhoto || undefined}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                    {user?.firstName?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-1.5 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Profile Photo
                </p>
                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    name="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-8 text-xs font-semibold gap-1.5 shadow-2xs border-border/70"
                  >
                    <UploadCloud className="w-3.5 h-3.5 text-primary" />
                    Upload Image
                  </Button>
                  <span className="text-[11px] text-muted-foreground">
                    JPG, PNG or WEBP (Max 5MB)
                  </span>
                </div>
              </div>
            </div>

            {/* Name Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  First Name
                </FieldLabel>
                <Input
                  name="firstName"
                  defaultValue={user?.firstName || ''}
                  required
                  className="h-9.5 text-sm bg-background border-border/80"
                  placeholder="First name"
                />
                <FieldError errors={apiErrors} field="firstName" />
              </Field>

              <Field>
                <FieldLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Last Name
                </FieldLabel>
                <Input
                  name="lastName"
                  defaultValue={user?.lastName || ''}
                  required
                  className="h-9.5 text-sm bg-background border-border/80"
                  placeholder="Last name"
                />
                <FieldError errors={apiErrors} field="lastName" />
              </Field>
            </div>

            {/* Contact Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Contact Phone
                </FieldLabel>
                <Input
                  name="phoneNumber"
                  defaultValue={user?.phoneNumber || ''}
                  placeholder="01XXXXXXXXX"
                  className="h-9.5 text-sm bg-background border-border/80"
                />
                <FieldError errors={apiErrors} field="phoneNumber" />
              </Field>

              <Field>
                <FieldLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Date of Birth
                </FieldLabel>
                <Input
                  name="dateOfBirth"
                  type="date"
                  defaultValue={formattedDob}
                  className="h-9.5 text-sm bg-background border-border/80"
                />
                <FieldError errors={apiErrors} field="dateOfBirth" />
              </Field>
            </div>

            {/* Address Field */}
            <Field>
              <FieldLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Residential Address
              </FieldLabel>
              <Input
                name="address"
                defaultValue={user?.address || ''}
                placeholder="City, District, Country"
                className="h-9.5 text-sm bg-background border-border/80"
              />
              <FieldError errors={apiErrors} field="address" />
            </Field>

            {/* Gender & Designation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Gender
                </FieldLabel>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="h-9.5 text-sm bg-background border-border/80">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError errors={apiErrors} field="gender" />
              </Field>

              {(user?.role === 'ADMIN' || user?.role === 'TEACHER') && (
                <Field>
                  <FieldLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Designation / Title
                  </FieldLabel>
                  <Input
                    name="designation"
                    defaultValue={(user as any)?.designation || ''}
                    placeholder="e.g. Senior Lecturer"
                    className="h-9.5 text-sm bg-background border-border/80"
                  />
                  <FieldError errors={apiErrors} field="designation" />
                </Field>
              )}
            </div>
          </div>

          {/* Dialog Footer */}
          <div className="flex justify-end items-center gap-3 px-6 py-4 border-t border-border/60 bg-muted/20">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="h-9 px-4 text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="h-9 px-5 text-xs font-semibold gap-2 shadow-xs"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {loading ? 'Saving Updates...' : 'Save Profile Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileFormDialog;
