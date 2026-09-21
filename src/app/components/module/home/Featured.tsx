'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '@/app/components/shared/Header';
import nursery from '@/assets/nursery.jpg';
import photo3 from '@/assets/nurseryresult.jpg';
import photo2 from '@/assets/oyada.jpg';
import photo1 from '@/assets/oyada2.jpg';
import pared from '@/assets/pared.jpg';
import pareda from '@/assets/paredresult.jpg';
import heroImage from '@/assets/hero.jpg';
import hero2 from '@/assets/hero2.jpg';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Maximize2,
  Tag,
} from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface GalleryItem {
  id: number;
  src: StaticImageData;
  title: string;
  category: 'একাডেমিক' | 'ক্রীড়া' | 'সাংস্কৃতিক' | 'ক্যাম্পাস';
  span?: string;
  description: string;
}

const Featured = () => {
  const [activeCategory, setActiveCategory] = useState<string>('সকল');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const images: GalleryItem[] = [
    {
      id: 1,
      src: pared,
      title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ও মার্চপাস্ট',
      category: 'ক্রীড়া',
      span: 'md:col-span-2 md:row-span-2',
      description: 'শিক্ষার্থীদের শারীরিক বিকাশ ও ক্রীড়া নৈপুণ্যের বার্ষিক মহড়া।',
    },
    {
      id: 2,
      src: photo2,
      title: 'সাংস্কৃতিক উৎসব ও নাটক মঞ্চায়ন',
      category: 'সাংস্কৃতিক',
      span: 'md:col-span-1 md:row-span-1',
      description: 'জাতীয় দিবস ও বার্ষিক সাংস্কৃতিক প্রতিযোগিতার বর্ণাঢ্য আয়োজন।',
    },
    {
      id: 3,
      src: pareda,
      title: 'মেধাবী শিক্ষার্থীদের পুরস্কার বিতরণী',
      category: 'একাডেমিক',
      span: 'md:col-span-1 md:row-span-1',
      description: 'বার্ষিক পরীক্ষায় কৃতিত্বপূর্ণ ফলাফলের জন্য সম্মাননা প্রদান।',
    },
    {
      id: 4,
      src: nursery,
      title: 'আধুনিক কম্পিউটার ও ডিজিটাল বিজ্ঞান ল্যাব',
      category: 'ক্যাম্পাস',
      span: 'md:col-span-2 md:row-span-1',
      description: 'হাতে-কলমে বিজ্ঞান ও তথ্যপ্রযুক্তি শিক্ষার সুসজ্জিত ল্যাবরেটরি।',
    },
    {
      id: 5,
      src: photo1,
      title: 'ডিজিটাল লাইব্রেরি ও রিডিং জোন',
      category: 'একাডেমিক',
      span: 'md:col-span-1 md:row-span-2',
      description: 'দেশি-বিদেশি সমৃদ্ধ বই ও রেফারেন্স কালেকশন।',
    },
    {
      id: 6,
      src: photo3,
      title: 'সহশিক্ষা কার্যক্রম ও প্রজেক্ট প্রদর্শনী',
      category: 'একাডেমিক',
      span: 'md:col-span-1 md:row-span-1',
      description: 'শিক্ষার্থীদের তৈরি উদ্ভাবনী সায়েন্স ও আর্ট প্রজেক্ট।',
    },
    {
      id: 7,
      src: heroImage,
      title: 'ক্যাম্পাস অ্যাসেম্বলি ও শপথ অনুষ্ঠান',
      category: 'ক্যাম্পাস',
      span: 'md:col-span-1 md:row-span-1',
      description: 'প্রতিদিনের নৈতিক শিক্ষা ও জাতীয় সংগীত পরিবেশনা।',
    },
    {
      id: 8,
      src: hero2,
      title: 'বার্ষিক সাংস্কৃতিক অনুষ্ঠান ও পুরস্কার',
      category: 'সাংস্কৃতিক',
      span: 'md:col-span-1 md:row-span-1',
      description: 'শিক্ষার্থীদের অংশগ্রহণে বর্ণিল সাংস্কৃতিক আয়োজন।',
    },
  ];

  const categories = ['সকল', 'একাডেমিক', 'ক্রীড়া', 'সাংস্কৃতিক', 'ক্যাম্পাস'];

  const filteredImages =
    activeCategory === 'সকল'
      ? images
      : images.filter((img) => img.category === activeCategory);

  const handlePrev = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) =>
      prev! > 0 ? prev! - 1 : filteredImages.length - 1
    );
  }, [selectedImageIndex, filteredImages.length]);

  const handleNext = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) =>
      prev! < filteredImages.length - 1 ? prev! + 1 : 0
    );
  }, [selectedImageIndex, filteredImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, handlePrev, handleNext]);

  return (
    <section className="w-full py-16 sm:py-20 bg-white dark:bg-[#070D18] border-b border-slate-100 dark:border-slate-800/80 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-blue-700 dark:text-sky-300 text-xs sm:text-sm font-bold mb-2.5 shadow-xs">
            <Camera className="w-4 h-4 text-blue-600 dark:text-sky-400" />
            <span>আমাদের ক্যাম্পাস মুহূর্তসমূহ</span>
          </div>
          <Header
            title="বিদ্যালয়"
            title2=" গ্যালারি"
            sub="আমাদের স্কুলের আনন্দময় মুহূর্ত, ক্লাস, খেলাধুলা এবং সহশিক্ষা কার্যক্রমগুলো এক নজরে দেখুন।"
          />
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 shrink-0 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 scale-105'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-300 hover:bg-blue-50/50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 shadow-2xs'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-sky-300 bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 px-3.5 py-2 rounded-2xl shadow-xs shrink-0">
            <Eye className="w-4 h-4 text-blue-600 dark:text-sky-400" />
            <span>{filteredImages.length}টি ছবি প্রদর্শিত হচ্ছে</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-4 sm:gap-5 mb-12">
          {filteredImages.map((image, index) => (
            <motion.div
              layout
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative overflow-hidden rounded-3xl group cursor-pointer ${
                image.span || 'md:col-span-1 md:row-span-1'
              } bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-2xl transition-all duration-300`}
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />

              <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-950/80 text-white backdrop-blur-md border border-white/20 shadow-sm">
                  <Tag className="w-3 h-3 text-sky-400" />
                  <span>{image.category}</span>
                </span>
              </div>

              <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                <div className="w-8 h-8 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-md">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 text-white space-y-1">
                <h3 className="text-white font-bold text-sm sm:text-base leading-snug drop-shadow-sm group-hover:text-sky-200 transition-colors">
                  {image.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-300 mt-1 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-normal">
                  {image.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link href="/about" className="inline-block">
            <button className="group bg-white dark:bg-slate-900 hover:bg-blue-600 dark:hover:bg-blue-600 text-slate-700 dark:text-slate-200 hover:text-white border border-slate-200 dark:border-slate-800 hover:border-blue-600 dark:hover:border-blue-600 px-7 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 shadow-2xs hover:shadow-lg hover:scale-105 flex items-center gap-2.5 cursor-pointer">
              <span>আমাদের ক্যাম্পাস লাইফ ও বিস্তারিত জানুন</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedImageIndex(null)}
          >
            <div
              className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-50 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-600 text-white">
                  {filteredImages[selectedImageIndex].category}
                </span>
                <span className="text-xs text-slate-300 font-semibold">
                  {selectedImageIndex + 1} / {filteredImages.length}
                </span>
              </div>

              <button
                onClick={() => setSelectedImageIndex(null)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20 focus:outline-none cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={selectedImageIndex}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-[55vh] sm:h-[68vh] rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-slate-900"
              >
                <Image
                  src={filteredImages[selectedImageIndex].src}
                  alt={filteredImages[selectedImageIndex].title}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>

              <div className="mt-4 text-center text-white max-w-2xl px-4">
                <h4 className="text-lg sm:text-xl font-bold">
                  {filteredImages[selectedImageIndex].title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {filteredImages[selectedImageIndex].description}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-blue-600 text-white backdrop-blur-md border border-white/20 transition-all shadow-xl cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-blue-600 text-white backdrop-blur-md border border-white/20 transition-all shadow-xl"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Featured;
