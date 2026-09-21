import TeacherMagnetCard from '@/app/components/module/home/TeacherCard';
import { getTeachers } from '@/app/services/teacher/getTeachers';
import { ITeacher } from '@/types/teacher.interface';
import * as motion from 'framer-motion/client';
import { Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function OurTeacher() {
  const data = await getTeachers();
  let teachers: ITeacher[] = data?.teachers || [];

  // Fallback demo faculty data if server returns empty list
  if (!teachers || teachers.length === 0) {
    teachers = [
      {
        id: '1',
        firstName: 'মোঃ রফিকুল',
        lastName: 'ইসলাম',
        designation: 'সহকারী প্রধান শিক্ষক (গণিত)',
        email: 'rafiqul@dhormopur.edu.bd',
        phoneNumber: '+880 1711-234567',
      },
      {
        id: '2',
        firstName: 'ফারহানা',
        lastName: 'আক্তার',
        designation: 'সিনিয়র শিক্ষক (ইংরেজি)',
        email: 'farhana@dhormopur.edu.bd',
        phoneNumber: '+880 1812-345678',
      },
      {
        id: '3',
        firstName: 'ড. মাহমুদুর',
        lastName: 'রহমান',
        designation: 'সিনিয়র শিক্ষক (পদার্থ ও বিজ্ঞান)',
        email: 'mahmud@dhormopur.edu.bd',
        phoneNumber: '+880 1913-456789',
      },
      {
        id: '4',
        firstName: 'মোছাঃ নাসরিন',
        lastName: 'সুলতানা',
        designation: 'সহকারী শিক্ষক (বাংলা ও সাহিত্য)',
        email: 'nasrin@dhormopur.edu.bd',
        phoneNumber: '+880 1614-567890',
      },
    ];
  }

  const teacherCount = teachers.length > 4 ? teachers.length : 25;

  return (
    <section className="w-full py-16 sm:py-20 bg-linear-to-b from-slate-50/90 via-blue-50/30 to-slate-100/80 dark:from-[#070D18] dark:via-[#091326] dark:to-[#070D18] border-y border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Decorative Ambient Mesh Glows */}
      <div className="absolute top-10 -right-20 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header Animation - Minimal, Clean & Focused */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-sky-500/10 border border-blue-200/80 dark:border-sky-400/20 text-blue-700 dark:text-sky-300 text-xs sm:text-sm font-bold mb-3 shadow-2xs">
            <Users className="w-4 h-4 text-blue-600 dark:text-sky-400" />
            <span>আমাদের শিক্ষক পরিষদ ({teacherCount}+ জন)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
            আমাদের{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-600 to-sky-600 dark:from-sky-400 dark:via-blue-300 dark:to-indigo-300">
              শিক্ষকবৃন্দ
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            দক্ষ, অভিজ্ঞ ও স্নেহশীল শিক্ষকগণের প্রত্যক্ষ তত্ত্বাবধানে পরিচালিত মানসম্মত পাঠদান কার্যক্রম।
          </p>
        </motion.div>

        {/* Teachers Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
          {teachers.slice(0, 8).map((teacher, index) => (
            <TeacherMagnetCard
              key={teacher.id || index}
              teacher={teacher}
              index={index}
            />
          ))}
        </div>

        {/* View All Faculty Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link href="/about" className="inline-block">
            <button className="group bg-white dark:bg-slate-900 hover:bg-blue-600 dark:hover:bg-blue-600 text-slate-700 dark:text-slate-200 hover:text-white border border-slate-200 dark:border-slate-800 hover:border-blue-600 dark:hover:border-blue-600 px-8 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 shadow-2xs hover:shadow-lg hover:scale-105 flex items-center gap-2.5">
              <span>সকল শিক্ষকমণ্ডলীর তালিকা ও প্রোফাইল দেখুন</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
