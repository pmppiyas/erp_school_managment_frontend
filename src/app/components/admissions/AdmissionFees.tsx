'use client';

import { motion } from 'framer-motion';
import {
  Sparkles,
  CreditCard,
  Gift,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Building,
  ShieldCheck,
} from 'lucide-react';

export default function AdmissionFees() {
  const feeList = [
    {
      classTier: 'প্রাক-প্রাথমিক (প্লে, নার্সারি, কেজি)',
      formFee: 'বিনামূল্যে',
      admissionFee: '৩,৫০০ ৳',
      sessionCharge: '১,৫০০ ৳',
      monthlyFee: '১,২০০ ৳',
      features: ['রঙিন ওয়ার্কবুক ও শিট', 'খেলনাসামগ্রী ব্যবহার', 'ডিজিটাল স্মার্ট ক্লাস'],
      popular: false,
    },
    {
      classTier: 'প্রাথমিক (১ম শ্রেণি - ৫ম শ্রেণি)',
      formFee: 'বিনামূল্যে',
      admissionFee: '৪,৫০০ ৳',
      sessionCharge: '২,০০০ ৳',
      monthlyFee: '১,৫০০ ৳',
      features: ['কম্পিউটার ল্যাব ক্লাস', 'ইংলিশ স্পোকেন ক্লাব', 'সাপ্তাহিক মূল্যায়ন ডায়েরি'],
      popular: true,
    },
    {
      classTier: 'জুনিয়র মাধ্যমিক (৬ষ্ঠ - ৮ম শ্রেণি)',
      formFee: 'বিনামূল্যে',
      admissionFee: '৫,৫০০ ৳',
      sessionCharge: '২,৫০০ ৳',
      monthlyFee: '১,৮০০ ৳',
      features: ['বিজ্ঞান ব্যবহারিক ল্যাব', 'আইসিটি প্রোগ্রামিং ক্লাস', 'ক্রীড়া ও সাংস্কৃতিক ক্লাব'],
      popular: false,
    },
    {
      classTier: 'মাধ্যমিক (৯ম ও ১০ম শ্রেণি)',
      formFee: 'বিনামূল্যে',
      admissionFee: '৬,০০০ ৳',
      sessionCharge: '৩,০০০ ৳',
      monthlyFee: '২,২০০ ৳',
      features: ['এসএসসি স্পেশাল মডেল টেস্ট', 'ফিজিক্স-কেমিস্ট্রি ল্যাব', 'ক্যারিয়ার কাউন্সেলিং'],
      popular: false,
    },
  ];

  const discounts = [
    {
      title: 'ট্যালেন্টপুল মেধা বৃত্তি',
      desc: 'বিগত শিক্ষাবর্ষে জিপিএ ৫.০০ ও বোর্ড বৃত্তিপ্রাপ্ত শিক্ষার্থীদের জন্য ৫০% থেকে ১০০% পর্যন্ত মাসিক বেতন মওকুফ।',
      icon: Gift,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800/60',
    },
    {
      title: 'সহোদর/সহোদরা ছাড় (Sibling Discount)',
      desc: 'একই পরিবারের দুই বা ততোধিক সন্তান অধ্যয়নরত থাকলে দ্বিতীয় সন্তানের মাসিক বেতনে ২৫% ছাড় প্রযোজ্য।',
      icon: ShieldCheck,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800/60',
    },
    {
      title: 'দরিদ্র ও এতিম কল্যাণ তহবিল',
      desc: 'অসচ্ছল, সুবিধাবঞ্চিত ও এতিম শিক্ষার্থীদের জন্য সম্পূর্ণ বিনামূল্যে বই, খাতা ও শিক্ষা সহায়তা প্রদান করা হয়।',
      icon: HeartIcon,
      color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800/60',
    },
  ];

  return (
    <section
      id="fees-structure"
      className="w-full py-16 sm:py-20 bg-slate-50/70 dark:bg-[#070D18] border-b border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300 scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-blue-700 dark:text-sky-300 text-xs sm:text-sm font-bold mb-3 shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-sky-400" />
            <span>স্বচ্ছ ও সাশ্রয়ী ফি কাঠামো</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4"
          >
            ভর্তি ফি ও{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-sky-400 dark:to-blue-400">
              বেতন বিবরণী
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
          >
            আমাদের শিক্ষা ফি সম্পূর্ণ উন্মুক্ত এবং কোনো প্রকার গোপন বা অতিরিক্ত খরচ নেই।
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {feeList.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-slate-900/90 border transition-all duration-300 hover:-translate-y-1 ${
                tier.popular
                  ? 'border-blue-500 shadow-xl shadow-blue-500/10 dark:border-blue-500/80 ring-2 ring-blue-500/20'
                  : 'border-slate-200/80 dark:border-slate-800 hover:border-blue-300 shadow-xs hover:shadow-xl'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold shadow-md">
                  সর্বাধিক জনপ্রিয়
                </span>
              )}

              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4">
                  {tier.classTier}
                </h3>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 mb-5">
                  <div className="flex justify-between items-center mb-2 text-xs">
                    <span className="text-slate-500 dark:text-slate-400">ভর্তি ফরম:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {tier.formFee}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2 text-xs">
                    <span className="text-slate-500 dark:text-slate-400">ভর্তি ফি:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {tier.admissionFee}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2 text-xs">
                    <span className="text-slate-500 dark:text-slate-400">সেশন চার্জ (বার্ষিক):</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {tier.sessionCharge}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      মাসিক বেতন:
                    </span>
                    <span className="text-lg font-black text-blue-600 dark:text-sky-400">
                      {tier.monthlyFee}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block">
                    সুবিধাসমূহ:
                  </span>
                  {tier.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 text-center">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  * বার্ষিক পরীক্ষার ফি স্বতন্ত্রভাবে ধার্য হবে
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scholarships & Discounts Banner */}
        <div className="mb-14">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            বিশেষ বৃত্তি ও ছাড় সুবিধা
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {discounts.map((disc, idx) => {
              const Icon = disc.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-4 ${disc.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {disc.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {disc.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment Channels Guide */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-300 text-xs font-bold mb-3">
                <Smartphone className="w-3.5 h-3.5" />
                <span>ডিজিটাল ও ব্যাংক পেমেন্ট সাপোর্ট</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                সহজেই ঘরে বসে বিকাশ, নগদ বা ব্যাংক একাউন্টে ফি পরিশোধ করুন
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                অনলাইন পেমেন্ট করার পর ট্রানজ্যাকশন আইডি ও শিক্ষার্থীর রোল/আইডি নম্বর সংরক্ষণ করুন এবং
                অফিসে মেসেজ বা পেমেন্ট স্লিপ সাবমিট করে তাৎক্ষণিক ডিজিটাল রসিদ সংগ্রহ করুন।
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold backdrop-blur-md">
                বিকাশ মার্চেন্ট: 01812-345678
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold backdrop-blur-md">
                নগদ পার্সোনাল: 01712-987654
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
