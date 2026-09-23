'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  User,
  Phone,
  Mail,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Copy,
  Printer,
  FileCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AdmissionOnlineForm() {
  const [formData, setFormData] = useState({
    studentNameBn: '',
    studentNameEn: '',
    gender: 'ছেলে',
    dob: '',
    targetClass: '১ম শ্রেণি',
    previousSchool: '',
    fatherName: '',
    motherName: '',
    phone: '',
    whatsapp: '',
    email: '',
    presentAddress: '',
    remarks: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [appId, setAppId] = useState('');

  const classes = [
    'প্লে-গ্রুপ',
    'নার্সারি',
    'কেজি (KG)',
    '১ম শ্রেণি',
    '২য় শ্রেণি',
    '৩য় শ্রেণি',
    '৪র্থ শ্রেণি',
    '৫ম শ্রেণি',
    '৬ষ্ঠ শ্রেণি',
    '৭ম শ্রেণি',
    '৮ম শ্রেণি',
    '৯ম শ্রেণি (বিজ্ঞান)',
    '৯ম শ্রেণি (মানবিক)',
    '১০ম শ্রেণি (বিজ্ঞান)',
    '১০ম শ্রেণি (মানবিক)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.studentNameEn.trim()) {
      toast.error('শিক্ষার্থীর নাম (ইংরেজিতে) প্রদান করুন');
      return;
    }
    if (!formData.phone.trim()) {
      toast.error('অভিভাবকের সক্রিয় মোবাইল নম্বর প্রদান করুন');
      return;
    }
    if (!formData.fatherName.trim()) {
      toast.error('পিতার নাম প্রদান করুন');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `DMA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setAppId(generatedId);
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success('ভর্তি আবেদন সফলভাবে গৃহীত হয়েছে!');
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      studentNameBn: '',
      studentNameEn: '',
      gender: 'ছেলে',
      dob: '',
      targetClass: '১ম শ্রেণি',
      previousSchool: '',
      fatherName: '',
      motherName: '',
      phone: '',
      whatsapp: '',
      email: '',
      presentAddress: '',
      remarks: '',
    });
    setIsSubmitted(false);
    setAppId('');
  };

  const handleCopyId = () => {
    if (appId) {
      navigator.clipboard.writeText(appId);
      toast.success('আবেদন ট্র্যাকিং আইডি কপি করা হয়েছে!');
    }
  };

  return (
    <section
      id="apply-online"
      className="w-full py-16 sm:py-20 bg-slate-50/70 dark:bg-[#070D18] border-b border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300 scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-blue-700 dark:text-sky-300 text-xs sm:text-sm font-bold mb-3 shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-sky-400" />
            <span>ডিজিটাল ভর্তি পোর্টাল ২০২৬</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4"
          >
            অনলাইন{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-sky-400 dark:to-blue-400">
              ভর্তি আবেদন ফর্ম
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
          >
            নিচের ফর্মটি নির্ভুল তথ্য দিয়ে পূরণ করে সাবমিট করুন। আমাদের ভর্তি প্রতিনিধি অতি দ্রুত আপনার সাথে যোগাযোগ করবে।
          </motion.p>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl dark:shadow-2xl backdrop-blur-md relative"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Student Information */}
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <User className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      ১. শিক্ষার্থীর তথ্য (Student Information)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        শিক্ষার্থীর নাম (ইংরেজিতে ক্যাপিটাল লেটার) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. MOHAMMED RAHIM"
                        value={formData.studentNameEn}
                        onChange={(e) =>
                          setFormData({ ...formData, studentNameEn: e.target.value.toUpperCase() })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all uppercase"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        শিক্ষার্থীর নাম (বাংলায়)
                      </label>
                      <input
                        type="text"
                        placeholder="যেমন: মোহাম্মদ রহিম"
                        value={formData.studentNameBn}
                        onChange={(e) =>
                          setFormData({ ...formData, studentNameBn: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        যে শ্রেণিতে ভর্তি হতে ইচ্ছুক *
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={formData.targetClass}
                          onChange={(e) =>
                            setFormData({ ...formData, targetClass: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        >
                          {classes.map((cls, i) => (
                            <option key={i} value={cls} className="dark:bg-slate-900">
                              {cls}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        লিঙ্গ *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {['ছেলে', 'মেয়ে'].map((g) => (
                          <button
                            type="button"
                            key={g}
                            onClick={() => setFormData({ ...formData, gender: g })}
                            className={`py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                              formData.gender === g
                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                : 'bg-slate-50/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        জন্ম তারিখ (Date of Birth)
                      </label>
                      <input
                        type="date"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        পূর্ববর্তী স্কুলের নাম (যদি থাকে)
                      </label>
                      <input
                        type="text"
                        placeholder="যেমন: পূর্বের স্কুলের নাম ও শেষ ক্লাস"
                        value={formData.previousSchool}
                        onChange={(e) =>
                          setFormData({ ...formData, previousSchool: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Guardian Information */}
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <Phone className="w-4 h-4 text-indigo-600 dark:text-sky-400" />
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      ২. অভিভাবকের তথ্য ও যোগাযোগ (Guardian & Contact)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        পিতার নাম *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="পিতার নাম"
                        value={formData.fatherName}
                        onChange={(e) =>
                          setFormData({ ...formData, fatherName: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        মাতার নাম
                      </label>
                      <input
                        type="text"
                        placeholder="মাতার নাম"
                        value={formData.motherName}
                        onChange={(e) =>
                          setFormData({ ...formData, motherName: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        অভিভাবকের মোবাইল নম্বর *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="017XX-XXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        হোয়াটসঅ্যাপ নম্বর (ঐচ্ছিক)
                      </label>
                      <input
                        type="tel"
                        placeholder="018XX-XXXXXX"
                        value={formData.whatsapp}
                        onChange={(e) =>
                          setFormData({ ...formData, whatsapp: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      বর্তমান ঠিকানা
                    </label>
                    <textarea
                      rows={2}
                      placeholder="গ্রাম/রোড, ইউনিয়ন/ওয়ার্ড, থানা, জেলা"
                      value={formData.presentAddress}
                      onChange={(e) =>
                        setFormData({ ...formData, presentAddress: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      কোনো বিশেষ মন্তব্য বা স্বাস্থ্য বিষয়ক তথ্য (যদি থাকে)
                    </label>
                    <input
                      type="text"
                      placeholder="যেমন: কোনো অ্যালার্জি বা বিশেষ নির্দেশনা"
                      value={formData.remarks}
                      onChange={(e) =>
                        setFormData({ ...formData, remarks: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    * চিহ্নিত ফিল্ডগুলো পূরণ করা আবশ্যক
                  </span>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-md shadow-blue-500/25 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>প্রসেসিং হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>ভর্তি আবেদন সাবমিট করুন</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              /* Success Confirmation Card */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 sm:py-12"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-md shadow-emerald-500/20">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <span className="inline-block text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3.5 py-1 rounded-full mb-3 border border-emerald-200 dark:border-emerald-800">
                  আবেদন সফল হয়েছে
                </span>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-3">
                  ধন্যবাদ, আপনার ভর্তি আবেদন গৃহীত হয়েছে!
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed mb-6">
                  ধর্মপুর মডেল একাডেমিতে <strong>{formData.studentNameEn}</strong>-এর জন্য{' '}
                  <strong>{formData.targetClass}</strong>-এ প্রাথমিক ভর্তি আবেদন নথিভুক্ত করা হয়েছে।
                </p>

                {/* Tracking ID Badge */}
                <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 mb-8">
                  <div className="text-left">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      আবেদন ট্র্যাকিং নম্বর (Application ID):
                    </span>
                    <span className="text-lg font-black text-blue-600 dark:text-sky-400 font-mono">
                      {appId}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopyId}
                    className="rounded-xl border-slate-300 dark:border-slate-600 text-xs font-bold cursor-pointer flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>কপি করুন</span>
                  </Button>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/40 text-blue-900 dark:text-sky-200 text-xs max-w-md mx-auto mb-8 text-left">
                  <p className="font-semibold mb-1">পরবর্তী করণীয়:</p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    আমাদের ভর্তি শাখা থেকে আগামী ২৪-৪৮ ঘণ্টার মধ্যে আপনার প্রদত্ত মোবাইল নম্বরে{' '}
                    <strong>({formData.phone})</strong> যোগাযোগ করে মৌখিক মূল্যায়ন ও ভর্তি তারিখ নিশ্চিত করা হবে।
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="rounded-xl px-5 py-2.5 font-bold border-slate-300 dark:border-slate-700 text-xs sm:text-sm cursor-pointer"
                  >
                    নতুন আরেকটি আবেদন করুন
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
