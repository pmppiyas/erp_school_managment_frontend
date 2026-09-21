'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowRight, Sparkles, PhoneCall, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ContactCTA() {
  const contacts = [
    {
      icon: Phone,
      title: 'সরাসরি হেল্পলাইন',
      label: '+880 1917-692136',
      sub: 'সকাল ৯:০০ টা - বিকাল ৪:০০ টা',
      href: 'tel:+8801917692136',
      badge: 'কল করুন',
      iconBg: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
    },
    {
      icon: Mail,
      title: 'অফিসিয়াল ইমেইল',
      label: 'office@dhormopur.edu.bd',
      sub: '২৪/৭ বার্তা পাঠানো যাবে',
      href: 'mailto:office@dhormopur.edu.bd',
      badge: 'ইমেইল পাঠান',
      iconBg: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white',
    },
    {
      icon: MapPin,
      title: 'ক্যাম্পাস লোকেশন',
      label: 'ধর্মপুর, কাজলা, গোবিন্দগঞ্জ',
      sub: 'গাইবান্ধা, রংপুর বিভাগ',
      href: 'https://maps.google.com/?q=Gobindaganj,Gaibandha',
      badge: 'ম্যাপ দেখুন',
      iconBg: 'bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white',
    },
  ];

  return (
    <section className="w-full py-16 sm:py-24 bg-linear-to-b from-blue-950 via-indigo-950 to-slate-950 border-t border-blue-900/60 text-white relative overflow-hidden transition-colors duration-300">
      {/* Subtle Ambient Mesh Lights */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 text-center">
        {/* Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 mb-4 text-xs font-bold text-sky-300 bg-white/10 border border-white/20 rounded-full shadow-2xs backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>নতুন শিক্ষাবর্ষে ভর্তি ও তথ্য</span>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight max-w-3xl mx-auto"
        >
          সন্তানের সুন্দর ভবিষ্যতের জন্য{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 via-blue-200 to-indigo-200">
            আজই যোগাযোগ করুন
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-slate-300 mb-10 text-xs sm:text-sm md:text-base leading-relaxed font-normal max-w-2xl mx-auto"
        >
          ভর্তি প্রক্রিয়া, ফি কাঠামো বা যেকোনো প্রাতিষ্ঠানিক তথ্যের জন্য আমাদের প্রশাসনিক দল আপনাকে আন্তরিক সহযোগিতা করতে প্রস্তুত।
        </motion.p>

        {/* Direct Interactive Contact Grid */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 text-left"
        >
          {contacts.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-sky-400/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 backdrop-blur-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 bg-white/15 text-sky-300 group-hover:bg-blue-600 group-hover:text-white"
                  >
                    <item.icon className="w-5.5 h-5.5" />
                  </div>
                  <span className="text-[11px] font-bold text-sky-300 group-hover:text-white bg-white/10 px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1 transition-colors">
                    <span>{item.badge}</span>
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>

                <span className="block text-xs font-bold text-slate-300 mb-1">
                  {item.title}
                </span>
                <span className="block text-base sm:text-lg font-black text-white tracking-tight break-all sm:break-normal group-hover:text-sky-300 transition-colors">
                  {item.label}
                </span>
              </div>

              <span className="block text-xs text-slate-400 mt-3 font-medium">
                {item.sub}
              </span>
            </a>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          <Link href="/contact" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto group bg-linear-to-r from-blue-500 via-indigo-500 to-sky-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-lg shadow-blue-500/30 hover:scale-105 flex items-center justify-center gap-2.5 cursor-pointer">
              <span>অনলাইন ভর্তি ও যোগাযোগ ফর্ম</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          <a href="tel:+8801917692136" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/25 px-7 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer">
              <PhoneCall className="w-4 h-4 text-sky-400" />
              <span>সরাসরি কল করুন</span>
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
