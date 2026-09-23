'use client';

import { motion } from 'framer-motion';
import {
  FileText,
  ClipboardCheck,
  UserCheck,
  CreditCard,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export default function AdmissionSteps() {
  const steps = [
    {
      step: '০১',
      title: 'ভর্তি ফরম পূরণ',
      desc: 'ওয়েবসাইটে নিচের অনলাইন ফরম পূরণ করুন অথবা সরাসরি স্কুল ক্যাম্পাসে এসে নির্ধারিত ভর্তি ফরম সংগ্রহ করে পূরণ করুন।',
      icon: FileText,
      badge: 'ধাপ ১',
      color: 'from-blue-600 to-cyan-500',
    },
    {
      step: '০২',
      title: 'কাগজপত্র যাচাই',
      desc: 'শিক্ষার্থীর অনলাইন জন্ম সনদ, পাসপোর্ট সাইজ রঙিন ছবি এবং পিতা-মাতার জাতীয় পরিচয়পত্রের কপি অফিসে জমা দিন।',
      icon: ClipboardCheck,
      badge: 'ধাপ ২',
      color: 'from-indigo-600 to-blue-500',
    },
    {
      step: '০৩',
      title: 'মৌখিক মূল্যায়ন ও সাক্ষাৎকার',
      desc: 'শিক্ষার্থী ও অভিভাবকের সাথে বন্ধুত্বপূর্ণ পরিবেশে সাধারণ পরিচিতি ও মেধা মূল্যায়ন অনুষ্ঠিত হয়।',
      icon: UserCheck,
      badge: 'ধাপ ৩',
      color: 'from-purple-600 to-indigo-500',
    },
    {
      step: '০৪',
      title: 'ভর্তি নিশ্চিত ও আইডি গ্রহণ',
      desc: 'নির্ধারিত ভর্তি ফি পরিশোধ করে স্টুডেন্ট আইডি কার্ড, বুক লিস্ট, ক্লাস রুটিন ও ডায়েরি সংগ্রহ করুন।',
      icon: CreditCard,
      badge: 'ধাপ ৪',
      color: 'from-emerald-600 to-teal-500',
    },
  ];

  return (
    <section className="w-full py-16 sm:py-20 bg-slate-50/70 dark:bg-[#070D18] border-b border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-blue-700 dark:text-sky-300 text-xs sm:text-sm font-bold mb-3 shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-sky-400" />
            <span>সহজ ও স্বচ্ছ ভর্তি প্রক্রিয়া</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4"
          >
            সহজ ৪টি ধাপে{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-sky-400 dark:to-blue-400">
              ভর্তি সম্পন্ন করুন
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
          >
            অভিভাবকদের সুবিধার্থে আমাদের ভর্তি প্রক্রিয়া অত্যন্ত স্বচ্ছ, ঝামেলামুক্ত ও আধুনিক প্রযুক্তিবান্ধব।
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500/50 shadow-xs hover:shadow-xl dark:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Step Top */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-13 h-13 rounded-2xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-3xl font-black text-slate-200 dark:text-slate-800 group-hover:text-blue-500/30 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <span className="inline-block text-[11px] font-bold text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full mb-2">
                    {item.badge}
                  </span>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2.5 group-hover:text-blue-600 dark:group-hover:text-sky-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                {/* Footer Check Indicator */}
                <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>সহজ প্রক্রিয়া</span>
                  </span>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-700 hidden lg:block" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
