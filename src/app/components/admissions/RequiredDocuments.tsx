'use client';

import { motion } from 'framer-motion';
import {
  FileCheck2,
  FileText,
  Image as ImageIcon,
  CreditCard,
  Building2,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export default function RequiredDocuments() {
  const documents = [
    {
      title: 'অনলাইন জন্ম নিবন্ধন সনদ',
      desc: 'শিক্ষার্থীর ১৭ ডিজিটের অনলাইন জন্ম নিবন্ধন সনদের স্পষ্ট ফটোকপি (English/Bangla)।',
      icon: FileText,
      mandatory: true,
    },
    {
      title: 'শিক্ষার্থীর রঙিন ছবি',
      desc: 'সাম্প্রতিক তোলা ৪ কপি ল্যাব-প্রিন্ট পাসপোর্ট সাইজ রঙিন ছবি (সাদা ব্যাকগ্রাউন্ড)।',
      icon: ImageIcon,
      mandatory: true,
    },
    {
      title: 'পিতা ও মাতার NID কার্ড',
      desc: 'পিতা ও মাতা উভয়ের জাতীয় পরিচয়পত্রের (NID) অথবা পাসপোর্টের স্পষ্ট ফটোকপি।',
      icon: CreditCard,
      mandatory: true,
    },
    {
      title: 'পিতা ও মাতার ছবি',
      desc: 'পিতা ও মাতার ১ কপি করে পাসপোর্ট সাইজ রঙিন ছবি (অফিসিয়াল নথির জন্য)।',
      icon: ImageIcon,
      mandatory: true,
    },
    {
      title: 'ছাড়পত্র / Transfer Certificate (TC)',
      desc: 'অন্য বিদ্যালয় থেকে আগত শিক্ষার্থীদের ক্ষেত্রে মূল ছাড়পত্র বা ট্রান্সফার সার্টিফিকেট।',
      icon: Building2,
      mandatory: false,
      note: '২য় থেকে ১০ম শ্রেণির জন্য প্রযোজ্য',
    },
    {
      title: 'পূর্ববর্তী ক্লাসের মার্কশিট / প্রগ্রেস কার্ড',
      desc: 'সর্বশেষ সমাপ্ত শিক্ষাবর্ষের বার্ষিক পরীক্ষার রিপোর্ট কার্ড বা নম্বরপত্রের কপি।',
      icon: FileCheck2,
      mandatory: false,
      note: '১ম থেকে ১০ম শ্রেণির জন্য প্রযোজ্য',
    },
  ];

  return (
    <section className="w-full py-16 sm:py-20 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
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
            <span>প্রয়োজনীয় কাগজপত্র নির্দেশিকা</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4"
          >
            ভর্তির জন্য{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-sky-400 dark:to-blue-400">
              প্রয়োজনীয় নথিপত্র
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
          >
            ভর্তি নিশ্চিতকরণ ও অফিসিয়াল নথিভুক্তির জন্য নিম্নোক্ত কাগজপত্রসমূহ নির্ধারিত সময়ের মধ্যে অফিসে জমা দিতে হবে।
          </motion.p>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {documents.map((doc, idx) => {
            const Icon = doc.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500/50 shadow-xs hover:shadow-xl dark:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-sky-400 flex items-center justify-center shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>

                    {doc.mandatory ? (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
                        বাধ্যতামূলক
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {doc.note || 'প্রযোজ্য ক্ষেত্রে'}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {doc.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {doc.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>ফটোকপি ও মূল কপি যাচাইযোগ্য</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Advisory Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 text-amber-900 dark:text-amber-200 flex items-start gap-3.5 text-xs sm:text-sm leading-relaxed">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>বিশেষ দ্রষ্টব্য:</strong> অনলাইনে আবেদন করার পর মৌখিক সাক্ষাৎকার ও ভর্তির সময় সকল
            কাগজপত্রের মূল কপি সাথে আনতে হবে। মূল কপি যাচাই শেষে তাৎক্ষণিক ফেরত প্রদান করা হবে এবং শুধুমাত্র
            ফটোকপিসমূহ স্কুলের স্থায়ী নথির জন্য জমা রাখা হবে।
          </div>
        </div>
      </div>
    </section>
  );
}
