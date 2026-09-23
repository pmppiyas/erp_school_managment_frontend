'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Baby,
  BookOpen,
  GraduationCap,
  Sparkles,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  Award,
} from 'lucide-react';

interface TierData {
  id: string;
  category: string;
  classes: string;
  age: string;
  seats: string;
  timing: string;
  focus: string[];
  evaluation: string;
}

export default function AdmissionEligibility() {
  const [activeTab, setActiveTab] = useState<'all' | 'pre' | 'primary' | 'secondary'>('all');

  const tiers: TierData[] = [
    {
      id: 'pre-primary',
      category: 'প্রাক-প্রাথমিক বিভাগ',
      classes: 'প্লে, নার্সারি ও কেজি (KG)',
      age: '৩.৫ বছর থেকে ৫.৫ বছর',
      seats: 'প্রতি শ্রেণিতে ৩০ জন (সীমিত আসন)',
      timing: 'সকাল ৮:৩০ - বেলা ১১:৩০',
      focus: [
        'বর্ণমালা ও ধ্বনিবিজ্ঞান (Phonics) পরিচিতি',
        'খেলার ছলে গান, ছড়া ও শারীরিক সক্রিয়তা',
        'আচার-ব্যবহার ও স্বনির্ভরতা শিক্ষা',
        'বাংলা ও ইংরেজি মৌলিক কথোপকথন',
      ],
      evaluation: 'মৌখিক কথোপকথন ও আনন্দময় মিথস্ক্রিয়া',
    },
    {
      id: 'primary',
      category: 'প্রাথমিক বিভাগ',
      classes: '১ম শ্রেণি থেকে ৫ম শ্রেণি',
      age: '৬+ বছর থেকে ১০+ বছর',
      seats: 'প্রতি সেকশনে ৩৫ জন',
      timing: 'সকাল ৮:০০ - দুপুর ১:০০',
      focus: [
        'জাতীয় শিক্ষাক্রমের আধুনিক বাস্তবায়ন',
        'বেসিক ম্যাথমেটিক্স ও সাধারণ বিজ্ঞান',
        'ইংরেজি স্পোকেন ও হ্যান্ডরাইটিং উন্নয়ন',
        'কম্পিউটার পরিচিতি ও আইটি ল্যাব ক্লাস',
      ],
      evaluation: 'পূর্ববর্তী ক্লাসের রিপোর্ট ও প্রাথমিক মেধা যাচাই',
    },
    {
      id: 'junior',
      category: 'জুনিয়র মাধ্যমিক বিভাগ',
      classes: '৬ষ্ঠ শ্রেণি থেকে ৮ম শ্রেণি',
      age: '১১+ বছর থেকে ১৩+ বছর',
      seats: 'প্রতি সেকশনে ৩৫ জন',
      timing: 'সকাল ৮:০০ - দুপুর ১:৪৫',
      focus: [
        'সৃজনশীল ও ধারণাগত শিখন পদ্ধতি',
        'বিজ্ঞান ব্যবহারিক ল্যাব ও প্রজেক্ট ওয়ার্ক',
        'আইসিটি ও প্রোগ্রামিং ফান্ডামেন্টালস',
        'বিতর্ক, কুইজ ও ক্রীড়া প্রতিযোগিতায় অংশগ্রহণ',
      ],
      evaluation: 'লিখিত মেধা মূল্যায়ন ও সাক্ষাৎ',
    },
    {
      id: 'secondary',
      category: 'মাধ্যমিক বিভাগ',
      classes: '৯ম শ্রেণি ও ১০ম শ্রেণি (বিজ্ঞান ও মানবিক)',
      age: '১৪+ বছর থেকে ১৬ বছর',
      seats: 'প্রতি গ্রুপে ৪০ জন',
      timing: 'সকাল ৭:৪৫ - দুপুর ২:১৫',
      focus: [
        'এসএসসি পরীক্ষার নিবিড় ও পরিকল্পিত প্রস্তুতি',
        'পদার্থ, রসায়ন ও জীববিজ্ঞানের সমৃদ্ধ ল্যাবরেটরি',
        'সাপ্তাহিক ও মাসিক মডেল টেস্ট ও প্রগ্রেস ট্র্যাকিং',
        'বিশেষ ক্যারিয়ার কাউন্সেলিং ও মেন্টরিং',
      ],
      evaluation: '৮ম শ্রেণির বোর্ড সনদ/ট্রান্সক্রিপ্ট ও মূল্যায়ন',
    },
  ];

  const filteredTiers =
    activeTab === 'all'
      ? tiers
      : activeTab === 'pre'
      ? tiers.filter((t) => t.id === 'pre-primary')
      : activeTab === 'primary'
      ? tiers.filter((t) => t.id === 'primary')
      : tiers.filter((t) => t.id === 'junior' || t.id === 'secondary');

  return (
    <section className="w-full py-16 sm:py-20 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-blue-700 dark:text-sky-300 text-xs sm:text-sm font-bold mb-3 shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-sky-400" />
            <span>বয়সসীমা ও যোগ্যতা নির্দেশিকা</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4"
          >
            শ্রেণিভিত্তিক{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-sky-400 dark:to-blue-400">
              ভর্তি যোগ্যতা ও আসন
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
          >
            প্রতিটি শিশুর মানসিক ও শারীরিক বিকাশের সাথে সামঞ্জস্য রেখে বয়সসীমা ও ভর্তি যোগ্যতা নির্ধারণ করা হয়েছে।
          </motion.p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              সকল বিভাগ
            </button>
            <button
              onClick={() => setActiveTab('pre')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'pre'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              প্রাক-প্রাথমিক (প্লে - কেজি)
            </button>
            <button
              onClick={() => setActiveTab('primary')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'primary'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              প্রাথমিক (১ম - ৫ম)
            </button>
            <button
              onClick={() => setActiveTab('secondary')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'secondary'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              মাধ্যমিক (৬ষ্ঠ - ১০ম)
            </button>
          </div>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredTiers.map((tier, idx) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group p-6 sm:p-8 rounded-3xl bg-slate-50/70 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500/50 shadow-xs hover:shadow-xl dark:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="inline-block text-xs font-bold text-blue-600 dark:text-sky-400 uppercase tracking-wider mb-1">
                    {tier.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {tier.classes}
                  </h3>
                </div>
                <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-sky-400 shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
              </div>

              {/* Quick Details Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 py-4 border-y border-slate-200/60 dark:border-slate-800 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
                  <span>
                    বয়সসীমা: <strong>{tier.age}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>
                    আসন: <strong>{tier.seats}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>
                    সময়সূচি: <strong>{tier.timing}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Award className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>
                    মূল্যায়ন: <strong>{tier.evaluation}</strong>
                  </span>
                </div>
              </div>

              {/* Key Focus Points */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  মূল শিক্ষণ ও বৈশিষ্ট্যসমূহ:
                </h4>
                <ul className="space-y-2">
                  {tier.focus.map((item, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
