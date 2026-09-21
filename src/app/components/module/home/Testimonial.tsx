'use client';

import Header from '@/app/components/shared/Header';
import { motion } from 'framer-motion';
import { Quote, Star, CheckCircle2, HeartHandshake, ShieldCheck } from 'lucide-react';

const Testimonial = () => {
  const testimonials = [
    {
      name: 'মোঃ শফিকুল ইসলাম',
      relation: 'অভিভাবক • ৭ম শ্রেণি (রোল: ০৪)',
      rating: 5,
      date: 'গত সপ্তাহে',
      text: 'শিক্ষকদের নিবিড় পর্যবেক্ষণ এবং আন্তরিক দিকনির্দেশনায় আমার সন্তানের পড়াশোনায় আমূল পরিবর্তন এসেছে। নিয়মিত ক্লাস টেস্ট ও রিপোর্ট কার্ডের মাধ্যমে অগ্রগতি ট্র্যাক করা খুব সহজ।',
      tone: 'bg-blue-600',
    },
    {
      name: 'ড. রুবাইয়াত হাসান',
      relation: 'অভিভাবক • ৩য় শ্রেণি',
      rating: 5,
      date: '২ সপ্তাহ আগে',
      text: 'বিদ্যালয়ের নিরাপদ পরিবেশ ও নৈতিক শিক্ষার বিষয়টি আমাকে সবচেয়ে বেশি মুগ্ধ করেছে। শুধু পাঠ্যপুস্তকের পড়ালেখা নয়, শিশুদের আদব-কায়দা ও সৃজনশীলতায় বিশেষ গুরুত্ব দেওয়া হয়।',
      tone: 'bg-emerald-600',
    },
    {
      name: 'ফারজানা আক্তার',
      relation: 'অভিভাবক • প্লে-গ্রুপ ও ২য় শ্রেণি',
      rating: 5,
      date: '১ মাস আগে',
      text: 'ছোট বাচ্চাদের জন্য এত চমৎকার খেলার মাঠ ও আনন্দময় ক্লাসরুম সত্যিই বিরল। শিক্ষিকারা মাতৃস্নেহে শিশুদের পাঠদান করান, ফলে বাচ্চারা প্রতিদিন স্কুলে যেতে আগ্রহী থাকে।',
      tone: 'bg-indigo-600',
    },
    {
      name: 'ইঞ্জি. তারেক মাহমুদ',
      relation: 'অভিভাবক • ৯ম শ্রেণি (বিজ্ঞান)',
      rating: 5,
      date: '৩ সপ্তাহ আগে',
      text: 'আধুনিক কম্পিউটার ও বিজ্ঞান ল্যাবে হাতে-কলমে প্র্যাকটিক্যাল ক্লাসের ব্যবস্থা থাকায় শিক্ষার্থীরা প্রযুক্তি ও বিজ্ঞানে দারুণ পারদর্শী হয়ে উঠছে। স্কুলের সার্বিক ব্যবস্থাপনায় আমি সন্তুষ্ট।',
      tone: 'bg-purple-600',
    },
  ];

  return (
    <section className="w-full py-16 sm:py-20 bg-white dark:bg-[#070D18] border-b border-slate-100 dark:border-slate-800/80 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Decorative Ambient Mesh Glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header - Clean & Trust-focused */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-blue-700 dark:text-sky-300 text-xs sm:text-sm font-bold mb-2.5 shadow-2xs">
            <HeartHandshake className="w-4 h-4 text-blue-600 dark:text-sky-400" />
            <span>অভিভাবকদের মূল্যবান অভিজ্ঞতা</span>
          </div>

          <Header
            title="অভিভাবকরা কি"
            title2=" বলছেন"
            sub="আমাদের শিক্ষাব্যবস্থা, পরিবেশ ও মানবিক যত্ন নিয়ে সম্মানিত অভিভাবকদের বাস্তব মতামত।"
          />

          {/* Social Proof Rating summary */}
          <div className="flex items-center justify-center gap-2 mt-4 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
            <div className="flex gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span>৪.৯ / ৫.০ রেটিং</span>
            <span className="text-slate-400">•</span>
            <span className="text-blue-600 dark:text-sky-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              <span>১০০% সন্তুষ্ট অভিভাবক</span>
            </span>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative bg-slate-50/60 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800/90 p-7 sm:p-8 rounded-3xl shadow-xs dark:shadow-xl hover:shadow-xl transition-all duration-300 border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500/50 flex flex-col justify-between backdrop-blur-md"
            >
              <div>
                {/* Card Top: Stars & Watermark Quote */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  <Quote className="w-7 h-7 text-blue-200 dark:text-blue-500/30 group-hover:text-blue-300 transition-colors" />
                </div>

                {/* Testimonial Quote Text */}
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base mb-6 leading-relaxed font-normal">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </div>

              {/* Author & Verification Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div
                    className={`${testimonial.tone} w-11 h-11 rounded-2xl flex items-center justify-center text-white font-extrabold text-base shadow-sm shrink-0`}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base group-hover:text-blue-600 dark:group-hover:text-sky-300 transition-colors flex items-center gap-1.5">
                      <span>{testimonial.name}</span>
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {testimonial.relation}
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-block text-[11px] font-semibold text-slate-400">
                  {testimonial.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
