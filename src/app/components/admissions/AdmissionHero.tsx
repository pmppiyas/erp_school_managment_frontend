'use client';

import { motion } from 'framer-motion';
import {
  GraduationCap,
  Calendar,
  Users,
  Award,
  Sparkles,
  ChevronRight,
  Home,
  FileText,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdmissionHero() {
  const stats = [
    {
      label: 'চলতি শিক্ষাবর্ষ',
      value: '২০২৬ শিক্ষাবর্ষ',
      sub: 'প্লে থেকে ১০ম শ্রেণি',
      icon: Calendar,
    },
    {
      label: 'শ্রেণি প্রতি আসন',
      value: 'সর্বোচ্চ ৩৫ জন',
      sub: 'নিবিড় পর্যবেক্ষণ নিশ্চিত',
      icon: Users,
    },
    {
      label: 'মেধাভিত্তিক বৃত্তি',
      value: '৫০% পর্যন্ত',
      sub: 'টিউশন ফি ছাড় সুবিধা',
      icon: Award,
    },
    {
      label: 'শিক্ষাদান পদ্ধতি',
      value: 'আধুনিক স্মার্ট ল্যাব',
      sub: 'প্রজেক্টর ও অডিও-ভিজ্যুয়াল',
      icon: ShieldCheck,
    },
  ];

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-16 sm:pb-20 overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 dark:from-slate-950 dark:via-[#070D18] dark:to-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Decorative Ambient Mesh Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-sky-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-8 w-72 h-72 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-8 w-80 h-80 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl relative z-10">
        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-6"
        >
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-sky-300 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>হোম</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-blue-600 dark:text-sky-400 font-bold">ভর্তি তথ্য</span>
        </motion.div>

        {/* Header Content */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-sky-500/10 border border-blue-200/80 dark:border-sky-400/20 text-blue-700 dark:text-sky-300 text-xs sm:text-sm font-bold mb-5 shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-sky-400 animate-pulse" />
            <span>২০২৬ শিক্ষাবর্ষে নতুন শিক্ষার্থী ভর্তি চলছে</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.18] mb-6"
          >
            আপনার সন্তানের উজ্জ্বল ভবিষ্যতের{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 dark:from-sky-400 dark:via-blue-300 dark:to-indigo-300">
              দৃঢ় সূচনা হোক এখানে
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-8"
          >
            ধর্মপুর মডেল একাডেমিতে আধুনিক শিক্ষাক্রম, অভিজ্ঞ শিক্ষকমণ্ডলী, সার্বক্ষণিক নিরাপত্তা ও মনোরম
            ক্যাম্পাস পরিবেশে প্লে থেকে দশম শ্রেণি পর্যন্ত সীমিত আসনে ভর্তি কার্যক্রম চলছে। ঘরে বসেই সরাসরি
            অনলাইনে আবেদন সম্পন্ন করুন।
          </motion.p>

          {/* Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4"
          >
            <Button
              size="lg"
              onClick={() => handleScrollToSection('apply-online')}
              className="rounded-2xl px-6 py-6 font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
            >
              <FileText className="w-5 h-5" />
              <span>অনলাইন ভর্তি আবেদন</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => handleScrollToSection('fees-structure')}
              className="rounded-2xl px-6 py-6 font-bold border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
            >
              <GraduationCap className="w-5 h-5 text-blue-600 dark:text-sky-400" />
              <span>ফি ও বেতন তালিকা</span>
            </Button>
          </motion.div>
        </div>

        {/* Stats / Highlight Cards */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500/50 shadow-xs hover:shadow-xl dark:shadow-2xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-md"
              >
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-sky-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
                      {item.label}
                    </span>
                    <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                      {item.value}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{item.sub}</span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
