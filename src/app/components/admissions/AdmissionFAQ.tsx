'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle, Sparkles } from 'lucide-react';

export default function AdmissionFAQ() {
  const faqs = [
    {
      id: 'item-1',
      question: 'ভর্তি পরীক্ষা কি অনুষ্ঠিত হয়? নাকি সরাসরি ভর্তি নেওয়া হয়?',
      answer:
        'প্রাক-প্রাথমিক (প্লে, নার্সারি ও কেজি) শ্রেণিতে কোনো প্রকার আনুষ্ঠানিক লিখিত পরীক্ষা নেওয়া হয় না; শুধুমাত্র শিশু ও অভিভাবকের সাথে আনন্দময় মৌখিক আলাপচারিতা অনুষ্ঠিত হয়। ১ম থেকে ৯ম শ্রেণি পর্যন্ত শিক্ষার্থীদের জন্য বাংলা, ইংরেজি ও গণিত বিষয়ের মৌলিক দক্ষতার ওপর একটি সংক্ষিপ্ত ও বন্ধুত্বপূর্ণ মেধা যাচাই নেওয়া হয়।',
    },
    {
      id: 'item-2',
      question: 'প্লে ও নার্সারি শ্রেণিতে ভর্তির ক্ষেত্রে বয়সসীমা কি শিথিলযোগ্য?',
      answer:
        'প্লে শ্রেণিতে ভর্তির জন্য সাধারণ বয়সসীমা ৩.৫ বছর এবং নার্সারিতে ৪.৫ বছর। তবে শিশুর মানসিক ও শারীরিক সক্ষমতা এবং অভিভাবকের অনুরোধ সাপেক্ষে ৩-৪ মাসের বয়সসীমা শিথিলযোগ্য হতে পারে।',
    },
    {
      id: 'item-3',
      question: 'একই পরিবারের দুই বা ততোধিক সন্তান ভর্তি হলে কি ছাড় সুবিধা আছে?',
      answer:
        'হ্যাঁ, ধর্মপুর মডেল একাডেমিতে "সহোদর/সহোদরা ছাড় (Sibling Discount)" নীতি কার্যকর রয়েছে। একই পরিবারের একাধিক সন্তান অধ্যয়নরত থাকলে দ্বিতীয় সন্তান থেকে প্রত্যেকের মাসিক বেতনে ২৫% ছাড় প্রদান করা হয়।',
    },
    {
      id: 'item-4',
      question: 'স্কুল পরিবহন (বাস/ভ্যান) সুবিধা ও রুট কেমন?',
      answer:
        'ধর্মপুর মডেল একাডেমির নিজস্ব ও নিরাপদ স্কুল ভ্যান/বাস সার্ভিস রয়েছে যা স্থানীয় আশপাশের সকল প্রধান রোড ও পাড়া-মহল্লা কভার করে। প্রতিটি গাড়িতে অভিজ্ঞ চালক ও সার্বক্ষণিক সহকারীর মাধ্যমে শিক্ষার্থীদের ক্যাম্পাসে আনা ও বাড়ি পৌঁছে দেওয়া হয়।',
    },
    {
      id: 'item-5',
      question: 'নতুন ক্লাসের পাঠ্যবই ও স্কুল ইউনিফর্ম কখন পাওয়া যাবে?',
      answer:
        'চূড়ান্ত ভর্তি নিশ্চিত হওয়ার সাথে সাথেই শিক্ষার্থীকে বুক লিস্ট ও রুটিন প্রদান করা হয়। প্রাথমিক ও মাধ্যমিক শাখার সরকারি পাঠ্যবই সরকারি নির্দেশনা অনুযায়ী বিনামূল্যে জানুয়ারি মাসের প্রথম দিনেই বিতরণ করা হয়। স্কুলের নির্ধারিত রঙের ইউনিফর্মের নমুনা অফিস থেকে সংগ্রহ করে তৈরি করে নিতে হবে।',
    },
    {
      id: 'item-6',
      question: 'বছরের মাঝামাঝি সময়ে অন্য স্কুল থেকে ট্রান্সফার নিয়ে ভর্তি হওয়া যাবে কি?',
      answer:
        'হ্যাঁ, অভিভাবকের বদলি বা বাসস্থানের পরিবর্তনের কারণে বছরের মাঝামাঝি সময়ে আসন শূন্য থাকা সাপেক্ষে পূর্ববর্তী স্কুলের ছাড়পত্র (TC) ও প্রগ্রেস কার্ড জমা দিয়ে ট্রান্সফার ভর্তি হওয়া সম্ভব।',
    },
  ];

  return (
    <section className="w-full py-16 sm:py-20 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span>সচরাচর জিজ্ঞাসা</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4"
          >
            ভর্তি সংক্রান্ত{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-sky-400 dark:to-blue-400">
              সাধারণ প্রশ্নোত্তর (FAQ)
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
          >
            অভিভাবকদের মনে সচরাচর যে প্রশ্নগুলো থাকে সেগুলোর উত্তর এখানে বিস্তারিত দেওয়া হয়েছে।
          </motion.p>
        </div>

        {/* Accordion FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="px-6 py-1 rounded-2xl bg-slate-50/70 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs"
              >
                <AccordionTrigger className="text-left font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-sky-400 hover:no-underline py-4">
                  <div className="flex items-center gap-3 text-left">
                    <HelpCircle className="w-5 h-5 text-blue-600 dark:text-sky-400 shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pb-4 pt-1 pl-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
