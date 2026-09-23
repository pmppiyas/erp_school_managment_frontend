'use client';

import { useState, useEffect } from 'react';
import Header from '@/app/components/shared/Header';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import {
  Bell,
  Calendar,
  Download,
  FileText,
  Pin,
  ExternalLink,
  Sparkles,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';

interface NoticeItem {
  id: number;
  title: string;
  message: string;
  date: string;
  category: 'পরীক্ষা' | 'ক্যাম্পাস' | 'ভর্তি' | 'ছুটি' | 'সাধারণ';
  isPinned?: boolean;
  fileUrl?: string;
}

const NoticeBoard = () => {
  const [activeCategory, setActiveCategory] = useState<string>('সকল');

  useEffect(() => {
    const scrollToNotice = () => {
      if (typeof window !== 'undefined' && window.location.hash === '#notice-board') {
        const el = document.getElementById('notice-board');
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
      }
    };

    scrollToNotice();
    window.addEventListener('hashchange', scrollToNotice);
    return () => window.removeEventListener('hashchange', scrollToNotice);
  }, []);

  const NoticeData: NoticeItem[] = [
    {
      id: 1,
      title: '২০২৬ শিক্ষাবর্ষের অর্ধবার্ষিক/মিড-টার্ম পরীক্ষার চূড়ান্ত সময়সূচি প্রকাশ',
      message:
        'সকল শ্রেণির অর্ধবার্ষিক পরীক্ষার চূড়ান্ত সময়সূচি ও নির্দেশিকা প্রকাশিত হয়েছে। শিক্ষার্থীদের নির্ধারিত সময় অনুযায়ী পরীক্ষায় উপস্থিত থাকার নির্দেশ দেওয়া হচ্ছে। পরীক্ষার হলে প্রবেশপত্র (Admit Card) সাথে রাখা বাধ্যতামূলক।',
      date: '২৮ জানুয়ারি, ২০২৬',
      category: 'পরীক্ষা',
      isPinned: true,
      fileUrl: '#',
    },
    {
      id: 2,
      title: 'প্লে-গ্রুপ থেকে ৯ম শ্রেণিতে নতুন শিক্ষার্থী ভর্তি কার্যক্রম চলমান',
      message:
        '২০২৬ শিক্ষাবর্ষে প্লে থেকে ৯ম শ্রেণি পর্যন্ত সীমিত আসনে ভর্তি চলছে। ভর্তি ফরম বিদ্যালয় অফিস অথবা ওয়েবসাইট থেকে সংগ্রহ করে আগামী ১০ ফেব্রুয়ারির মধ্যে জমা দিতে হবে।',
      date: '২৬ জানুয়ারি, ২০২৬',
      category: 'ভর্তি',
      isPinned: true,
      fileUrl: '#',
    },
    {
      id: 3,
      title: 'ক্যাম্পাস আধুনিকায়ন ও ডিজিটাল ল্যাব সংস্কার কার্যক্রম',
      message:
        'শিক্ষার্থীদের জন্য নতুন কম্পিউটার ও সায়েন্স ল্যাব আধুনিকায়ন কাজ শুরু হয়েছে। নিয়মিত ক্লাস স্বাভাবিক নিয়মেই চলবে।',
      date: '২৫ জানুয়ারি, ২০২৬',
      category: 'ক্যাম্পাস',
      fileUrl: '#',
    },
    {
      id: 4,
      title: 'শব-ই-বরাত ও আন্তর্জাতিক মাতৃভাষা দিবস উপলক্ষে বিদ্যালয় বন্ধের নোটিশ',
      message:
        'আসন্ন ২১শে ফেব্রুয়ারি আন্তর্জাতিক মাতৃভাষা দিবস উপলক্ষে বিদ্যালয় বন্ধ থাকবে। তবে বিশেষ সাংস্কৃতিক অনুষ্ঠানে অংশগ্রহণের জন্য সংশ্লিষ্টদের উপস্থিত থাকতে অনুরোধ করা হচ্ছে।',
      date: '২০ জানুয়ারি, ২০২৬',
      category: 'ছুটি',
      fileUrl: '#',
    },
    {
      id: 5,
      title: 'ডিজিটাল লাইব্রেরি ও রিডিংরুম সদস্যপদ নবায়ন বিজ্ঞপ্তি',
      message:
        'নতুন শিক্ষাবর্ষের সকল শিক্ষার্থীকে ডিজিটাল লাইব্রেরি কার্ড নবায়ন করার জন্য অনুরোধ করা হচ্ছে। অনলাইন বুক কালেকশন ব্যবহার করতে ওয়েবসাইট লগইন সক্রিয় করুন।',
      date: '১৫ জানুয়ারি, ২০২৬',
      category: 'সাধারণ',
      fileUrl: '#',
    },
  ];

  const categories = ['সকল', 'পরীক্ষা', 'ভর্তি', 'ক্যাম্পাস', 'ছুটি', 'সাধারণ'];

  const filteredNotices =
    activeCategory === 'সকল'
      ? NoticeData
      : NoticeData.filter((item) => item.category === activeCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'পরীক্ষা':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'ভর্তি':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'ক্যাম্পাস':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'ছুটি':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <section
      id="notice-board"
      className="w-full pt-8 sm:pt-12 pb-14 sm:pb-16 bg-slate-50/70 dark:bg-[#070D18] border-b border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300 scroll-mt-24 sm:scroll-mt-28"
    >
      {/* Decorative Ambient Mesh Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-blue-700 dark:text-sky-300 text-xs sm:text-sm font-bold mb-2.5 shadow-xs">
            <Bell className="w-4 h-4 text-blue-600 dark:text-sky-400 animate-pulse" />
            <span>সর্বশেষ তথ্য ও বিজ্ঞপ্তি</span>
          </div>
          <Header
            title="নোটিশ"
            title2="বোর্ড"
            sub="বিদ্যালয়ের সাম্প্রতিক সকল একাডেমিক ঘোষণা, পরীক্ষার রুটিন ও জরুরি তথ্যসমূহ।"
          />
        </motion.div>

        {/* Live News Flash Ticker Bar */}
        <div className="mb-6 sm:mb-8 rounded-2xl bg-white dark:bg-slate-900/90 border border-blue-100 dark:border-slate-800 shadow-md p-2 sm:p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-blue-600 via-indigo-600 to-sky-600 text-white font-bold text-xs sm:text-sm shrink-0 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-sky-200 animate-ping" />
            <Sparkles className="w-4 h-4 text-sky-200" />
            <span>জরুরি আপডেট:</span>
          </div>
          <div className="flex-1 overflow-hidden py-1">
            <div className="flex gap-8 whitespace-nowrap animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] cursor-pointer text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
              {NoticeData.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.fileUrl || '#'}
                  className="inline-flex items-center gap-2 hover:text-blue-600 dark:hover:text-sky-300 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</span>
                  <span className="text-[11px] text-slate-400">({item.date})</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 ${
                activeCategory === cat
                  ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-300 hover:bg-blue-50/50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 shadow-xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main 12-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Notice Accordion / Cards (8 Cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-4 sm:p-7 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-2">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-blue-600 dark:text-sky-400" />
                <span>বিজ্ঞপ্তি তালিকা</span>
                <span className="text-xs bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-sky-300 px-2 py-0.5 rounded-full font-semibold border border-blue-200/60 dark:border-blue-800/60">
                  {filteredNotices.length}টি
                </span>
              </h3>
            </div>

            {filteredNotices.length === 0 ? (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-sm">
                এই ক্যাটাগরিতে বর্তমানে কোনো নোটিশ নেই।
              </div>
            ) : (
              <Accordion type="single" collapsible className="space-y-3 pt-2">
                {filteredNotices.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={`notice-${item.id}`}
                    className="border border-slate-100 dark:border-slate-800/80 hover:border-blue-200 dark:hover:border-blue-800 rounded-2xl p-2 sm:p-3 transition-all duration-200 bg-slate-50/40 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800/80 shadow-xs hover:shadow-sm"
                  >
                    <AccordionTrigger className="hover:no-underline py-2 sm:py-3 px-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full text-left pr-3">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            {item.isPinned && (
                              <span className="inline-flex items-center gap-1 bg-linear-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs">
                                <Pin className="w-3 h-3 rotate-45 text-sky-200" /> পিন করা
                              </span>
                            )}
                            <span
                              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getCategoryColor(
                                item.category
                              )}`}
                            >
                              {item.category}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              {item.date}
                            </span>
                          </div>

                          <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base leading-snug">
                            {item.title}
                          </h4>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="pt-2 pb-3 px-2 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 mt-2">
                      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-2xs text-slate-700 dark:text-slate-300">
                        {item.message}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-2">
                        <span className="text-xs text-slate-400">
                          পোস্ট করেছেন: বিদ্যালয় প্রশাসন
                        </span>

                        <div className="flex items-center gap-2">
                          <Link
                            href={item.fileUrl || '#'}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/80 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-700 dark:text-sky-300 font-bold text-xs transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>PDF ডাউনলোড</span>
                          </Link>
                          <Link
                            href={item.fileUrl || '#'}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors"
                          >
                            <span>বিস্তারিত</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>

          {/* Right Column: Quick Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Urgent Bulletin Box */}
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-7 shadow-xl border border-blue-800/60">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md text-sky-300 border border-white/15 shadow-sm">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">জরুরি ঘোষণা ও সাহায্য</h4>
                    <p className="text-xs text-blue-200">হেল্পডেস্ক ও নির্দেশনা</p>
                  </div>
                </div>

                <p className="text-sm text-blue-100/90 leading-relaxed">
                  পরীক্ষা বা ভর্তি সংক্রান্ত যেকোনো তথ্যের জন্য সরাসরি অফিসে যোগাযোগ করুন অথবা আমাদের অনলাইন হেল্পলাইনে মেসেজ দিন।
                </p>

                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-blue-500/30 hover:scale-[1.02] transition-all"
                  >
                    <span>যোগাযোগ হেল্পডেস্ক</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Links & Downloads Box */}
            <div className="bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4.5 h-4.5 text-blue-600 dark:text-sky-400" />
                <span>গুরুত্বপূর্ণ ডাউনলোড ও লিংক</span>
              </h4>

              <ul className="space-y-2.5">
                {[
                  { name: 'একাডেমিক ক্যালেন্ডার ২০২৬', tag: 'PDF' },
                  { name: 'মিড-টার্ম পরীক্ষার রুটিন', tag: 'PDF' },
                  { name: 'নতুন ভর্তি আবেদন ফরম', tag: 'DOC' },
                  { name: 'সিলেবাস ও বইয়ের তালিকা', tag: 'PDF' },
                  { name: 'অনলাইন ফলাফল পোর্টাল', tag: 'Link' },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href="#"
                      className="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors" />
                        <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-700 dark:group-hover:text-sky-300 transition-colors">
                          {link.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 group-hover:bg-blue-600 group-hover:text-white border border-slate-200 dark:border-slate-700 group-hover:border-transparent transition-all shadow-2xs">
                        {link.tag}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default NoticeBoard;
