'use client';

import { motion } from 'framer-motion';
import {
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  Headphones,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdmissionHelpCTA() {
  return (
    <section className="w-full py-16 sm:py-20 bg-slate-50/70 dark:bg-[#070D18] text-slate-900 dark:text-white transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-14 bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 text-white shadow-2xl border border-blue-800/40"
        >
          {/* Ambient Lighting Background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-sky-300 text-xs sm:text-sm font-bold backdrop-blur-md">
                <Headphones className="w-4 h-4" />
                <span>ভর্তি হেল্পলাইন ও পরামর্শ কেন্দ্র</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                ভর্তি সংক্রান্ত যেকোনো তথ্যের জন্য সরাসরি কথা বলুন
              </h2>

              <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-xl font-normal">
                আমাদের ভর্তি কাউন্সেলর আপনার সন্তানের জন্য সঠিক শ্রেণি নির্বাচন, ফি ছাড়ের সুযোগ এবং
                ক্যাম্পাস ভিজিটের শিডিউল তৈরিতে সার্বক্ষণিক সহায়তা করবেন।
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>অফিস সময়: শনি - বৃহস্পতি (৮:০০ - ৩:০০)</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>ক্যাম্পাস: ধর্মপুর, কুমিল্লা</span>
                </div>
              </div>
            </div>

            {/* Right Action Cards */}
            <div className="lg:col-span-5 flex flex-col gap-3.5">
              <a
                href="tel:01812345678"
                className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all shadow-md backdrop-blur-md"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wider block">
                      ভর্তি হটলাইন
                    </span>
                    <span className="text-base sm:text-lg font-bold font-mono">
                      +880 1812-345678
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-sky-400 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://wa.me/8801812345678"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all shadow-md backdrop-blur-md"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                      হোয়াটসঅ্যাপ চ্যাট
                    </span>
                    <span className="text-base sm:text-lg font-bold font-mono">
                      +880 1712-987654
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </a>

              <Button
                size="lg"
                asChild
                className="w-full rounded-2xl py-6 font-bold bg-white text-slate-950 hover:bg-slate-100 shadow-xl cursor-pointer"
              >
                <Link href="/contact" className="flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>ক্যাম্পাস ভিজিট শিডিউল করুন</span>
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
