'use server';

import SignupForm from '@/app/components/module/auth/SignupForm';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export const generateMetadata = async () => {
  return {
    title: 'রেজিস্ট্রেশন | Hello Soft School ERP',
    description: 'নতুন অ্যাকাউন্টের জন্য আবেদন করুন',
  };
};

const SignupPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between p-4 sm:p-8 bg-slate-50/70 dark:bg-slate-950/60 text-foreground">
      {/* Top Header */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between pb-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <span className="font-extrabold text-sm text-foreground block">
              Hello Soft ERP
            </span>
            <span className="text-[10px] text-muted-foreground block">
              শিক্ষার্থী / ইউজার রেজিস্ট্রেশন
            </span>
          </div>
        </Link>

        <Link
          href="/login"
          className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>লগইনে ফিরুন</span>
        </Link>
      </div>

      {/* Main Form Container */}
      <div className="my-auto w-full flex items-center justify-center py-6">
        <SignupForm />
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground pt-4">
        © {new Date().getFullYear()} Hello Soft School ERP. সর্বস্বত্ব সংরক্ষিত।
      </div>
    </div>
  );
};

export default SignupPage;
