'use server';

import LoginForm from '@/app/components/module/auth/LoginForm';
import {
  GraduationCap,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  BarChart3,
  CreditCard,
  Bell,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';

export const generateMetadata = async () => {
  return {
    title: 'লগইন পোর্টাল | Hello Soft School ERP',
    description: 'স্মার্ট স্কুল ম্যানেজমেন্ট সিস্টেমে নিরাপদ প্রবেশদ্বার',
  };
};

const keyFeatures = [
  {
    icon: BarChart3,
    color: 'text-blue-400 bg-blue-500/15',
    text: 'অটোমেটেড রেজাল্ট প্রসেসিং ও অনলাইন মার্কশিট',
  },
  {
    icon: CreditCard,
    color: 'text-emerald-400 bg-emerald-500/15',
    text: 'অনলাইন ফি কালেকশন ও ইনস্ট্যান্ট ডিজিটাল রসিদ',
  },
  {
    icon: Bell,
    color: 'text-purple-400 bg-purple-500/15',
    text: 'স্মার্ট হাজিরা ট্র্যাকিং ও তাৎক্ষণিক SMS এলার্ট',
  },
  {
    icon: ShieldCheck,
    color: 'text-cyan-400 bg-cyan-500/15',
    text: 'রোল-ভিত্তিক সুরক্ষিত অ্যাডমিন ও ইউজার পোর্টাল',
  },
];

const LoginPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{
    redirectTo?: string;
    email?: string;
    password?: string;
  }>;
}) => {
  const resolvedParams = await searchParams;
  const redirect = resolvedParams?.redirectTo || '/dashboard';
  const email = resolvedParams?.email || '';
  const password = resolvedParams?.password || '';

  return (
    <div className="min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden w-full flex flex-col lg:flex-row bg-background text-foreground selection:bg-blue-600 selection:text-white">
      {/* LEFT SIDE: Clean & Minimal Showcase (Visible on lg and above) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[52%] relative overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 text-white flex-col justify-between p-6 xl:p-10">
        {/* Ambient Glows */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-5 right-5 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top: Logo & Back Link */}
        <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-md shadow-blue-500/25 ring-1 ring-white/20 group-hover:scale-105 transition-transform flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-base font-black tracking-tight text-white block">
                Hello Soft ERP
              </span>
              <span className="text-[10px] text-blue-300 block -mt-0.5 font-medium">
                স্মার্ট স্কুল ম্যানেজমেন্ট সিস্টেম
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all backdrop-blur-sm"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>মূল সাইট</span>
          </Link>
        </div>

        {/* Middle: Clean Headline & Simple Feature Points */}
        <div className="relative z-10 my-auto py-4 max-w-md">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-3 backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span>অল-ইন-ওয়ান এডুকেশন প্ল্যাটফর্ম</span>
          </div>

          <h1 className="text-2xl xl:text-3xl font-black tracking-tight leading-snug text-white mb-2">
            আধুনিক স্কুল ব্যবস্থাপনার{' '}
            <span className="bg-linear-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              বিশ্বস্ত সমাধান
            </span>
          </h1>

          <p className="text-slate-300 text-xs xl:text-sm leading-relaxed mb-6 font-normal">
            একটি মাত্র প্ল্যাটফর্মে শিক্ষার্থী, শিক্ষক ও প্রতিষ্ঠানের সার্বিক
            কার্যক্রম পরিচালনা করুন সহজে ও নির্ভুলভাবে।
          </p>

          {/* Clean 4-point list (No heavy paragraphs) */}
          <div className="space-y-2.5 mb-6">
            {keyFeatures.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
                >
                  <div
                    className={`w-7 h-7 rounded-lg ${item.color} flex items-center justify-center shrink-0`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-slate-200 font-medium">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Minimal Stats Row */}
          <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="font-bold text-white">১০,০০০+</span> শিক্ষার্থী
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-bold text-white">১০০%</span> পেপারলেস
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span className="font-bold text-white">২৪/৭</span> ক্লাউড
            </div>
          </div>
        </div>

        {/* Bottom: Minimal Copyright & Status */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/10">
          <p>© {new Date().getFullYear()} Hello Soft School ERP.</p>
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>সিস্টেম সচল</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Dedicated Login Area */}
      <div className="w-full lg:w-1/2 xl:w-[48%] flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 min-h-screen lg:min-h-0 lg:h-screen lg:max-h-screen bg-slate-50/70 dark:bg-slate-950/60 ">
        {/* Mobile-only Header */}
        <div className="lg:hidden w-full max-w-sm flex items-center justify-between pb-3 mb-2 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
              <GraduationCap className="h-4 w-4" />
            </div>
            <div>
              <span className="font-extrabold text-xs text-foreground block">
                Hello Soft ERP
              </span>
              <span className="text-[9px] text-muted-foreground block">
                স্কুল ম্যানেজমেন্ট পোর্টাল
              </span>
            </div>
          </Link>
          <Link
            href="/"
            className="text-[11px] font-semibold text-primary flex items-center gap-1 hover:underline"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>মূল সাইট</span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-sm sm:max-w-[420px] my-auto">
          <LoginForm
            redirect={redirect}
            initialEmail={email}
            initialPassword={password}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
