'use client';

import head from '@/assets/head.png';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Calendar,
  ClipboardList,
  Users,
  Quote,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Information = () => {
  const cards = [
    {
      title: 'অভিজ্ঞ শিক্ষকবৃন্দ',
      desc: 'দক্ষ ও স্নেহশীল শিক্ষকমণ্ডলীর পরিচিতি ও তথ্য',
      icon: <Users className="w-6 h-6 text-blue-600" />,
      link: '/about',
      iconBg: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'অনলাইন ফলাফল',
      desc: 'সহজেই বার্ষিক ও টার্ম রেজাল্ট যাচাই করুন',
      icon: <ClipboardList className="w-6 h-6 text-emerald-600" />,
      link: '/dashboard/result',
      iconBg: 'bg-emerald-100 text-emerald-600',
    },
    {
      title: 'পরীক্ষার সময়সূচি',
      desc: 'আসন্ন সকল পরীক্ষার তারিখ, সময় ও নিয়মাবলী',
      icon: <Calendar className="w-6 h-6 text-sky-600" />,
      link: '/dashboard',
      iconBg: 'bg-sky-100 text-sky-600',
    },
    {
      title: 'ক্লাস রুটিন',
      desc: 'শ্রেণিভিত্তিক দৈনিক ক্লাস ও বিষয়ভিত্তিক রুটিন',
      icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
      link: '/dashboard/routine',
      iconBg: 'bg-indigo-100 text-indigo-600',
    },
  ];

  return (
    <section className="w-full py-16 sm:py-20 bg-linear-to-b from-blue-50/60 via-sky-50/30 to-white dark:from-[#091122] dark:via-[#080E1C] dark:to-[#070D18] border-b border-blue-100/60 dark:border-slate-800/80 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Decorative Ambient Mesh Glows */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Chairman / Principal's Message Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 shadow-sm dark:shadow-2xl relative overflow-hidden backdrop-blur-md"
        >
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-linear-to-bl from-blue-500/10 via-sky-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Image Column (5 Cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-[340px] w-full">
                {/* Glowing Outer Ring */}
                <div className="absolute -inset-2 bg-linear-to-tr from-blue-600 via-indigo-600 to-sky-500 rounded-3xl blur-md opacity-25 group-hover:opacity-45 transition-opacity duration-500" />

                <div className="relative rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-950 border-2 border-white dark:border-white/15 shadow-2xl">
                  <Image
                    src={head}
                    alt="এমডি মোমিনুল ইসলাম লিটন - চেয়ারম্যান"
                    width={400}
                    height={460}
                    className="w-full h-[360px] sm:h-[400px] object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Badge on Photo */}
                  <div className="absolute bottom-4 inset-x-4 p-3 rounded-2xl bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border border-white/80 dark:border-white/10 shadow-md text-center">
                    <p className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-1.5">
                      <span>এমডি মোমিনুল ইসলাম লিটন</span>
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
                    </p>
                    <p className="text-[11px] font-semibold text-blue-700 dark:text-sky-300">
                      প্রতিষ্ঠাতা ও চেয়ারম্যান
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-sky-500/10 border border-blue-200/80 dark:border-sky-400/20 text-blue-700 dark:text-sky-300 text-xs sm:text-sm font-bold shadow-2xs">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                  <span>চেয়ারম্যানের বিশেষ বাণী</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                  শিশুর সুন্দর ভবিষ্যৎ ও নৈতিক শিক্ষা গড়ার দৃঢ় অঙ্গীকার
                </h2>

                <p className="text-sm sm:text-base font-semibold text-blue-700 dark:text-sky-300">
                  এমডি মোমিনুল ইসলাম লিটন • প্রতিষ্ঠাতা ও চেয়ারম্যান
                </p>
              </div>

              {/* Quote Block */}
              <div className="relative pl-6 sm:pl-7 border-l-4 border-blue-600 dark:border-blue-500 space-y-3 py-1">
                <Quote className="absolute -top-3 -left-3.5 w-7 h-7 text-blue-200 dark:text-blue-500/30" />
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
                  ধর্মপুর মডেল স্কুলে আমরা বিশ্বাস করি প্রতিটি শিশুর মধ্যেই
                  রয়েছে অপার সম্ভাবনা ও প্রতিভা। আমাদের লক্ষ্য কেবল
                  পাঠ্যপুস্তকের জ্ঞান দেওয়া নয়, বরং আনন্দময় পরিবেশ, আধুনিক
                  প্রযুক্তি এবং নৈতিক মূল্যবোধের সমন্বয়ে আগামী দিনের
                  আত্মবিশ্বাসী ও মানবিক নেতৃত্ব গড়ে তোলা।
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs sm:text-sm">
                  অভিজ্ঞ শিক্ষকমণ্ডলী, ডিজিটাল ক্লাসরুম এবং স্নেহময় যত্নের
                  মাধ্যমে আমরা প্রতিটি শিশুর মানসিক ও সৃজনশীল বিকাশ নিশ্চিত করি।
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 hover:scale-105 transition-all"
                >
                  <span>আমাদের লক্ষ্য ও উদ্দেশ্য জানুন</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Access Services / Feature Cards */}
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-sky-500/10 border border-blue-200/80 dark:border-sky-400/20 text-blue-700 dark:text-sky-300 text-xs font-bold mb-2 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                <span>ডিজিটাল সেবা ও পোর্টাল</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                একাডেমিক কর্নার ও পোর্টাল
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                প্রয়োজনীয় একাডেমিক তথ্য ও সেবাসমূহে দ্রুত প্রবেশ করুন
              </p>
            </div>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-sky-400 hover:text-blue-700 dark:hover:text-sky-300 group shrink-0 transition-colors"
            >
              <span>সকল পোর্টাল দেখুন</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link
                  href={card.link}
                  className="group relative flex flex-col justify-between p-6 bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500/50 shadow-xs hover:shadow-xl transition-all duration-300 h-full hover:-translate-y-1 backdrop-blur-md"
                >
                  <div className="space-y-3">
                    <div
                      className={`w-13 h-13 rounded-2xl flex items-center justify-center ${card.iconBg} shadow-xs group-hover:scale-110 transition-transform duration-300`}
                    >
                      {card.icon}
                    </div>

                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-300 transition-colors">
                        {card.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-sky-400 group-hover:gap-2.5 transition-all">
                    <span>প্রবেশ করুন</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Information;
