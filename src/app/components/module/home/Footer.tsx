import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
  GraduationCap,
  ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const quickLinks = [
    { name: 'আমাদের সম্পর্কে', href: '/about' },
    { name: 'ভর্তি তথ্য', href: '/admissions' },
    { name: 'একাডেমিক কার্যক্রম', href: '/academics' },
    { name: 'শিক্ষকমণ্ডলী', href: '/faculty' },
    { name: 'ইভেন্টস ও নোটিশ', href: '/events' },
    { name: 'যোগাযোগ', href: '/contact' },
  ];

  const resources = [
    { name: 'শিক্ষার্থী পোর্টাল', href: '/portal' },
    { name: 'অভিভাবক পোর্টাল', href: '/parent-portal' },
    { name: 'ডিজিটাল লাইব্রেরি', href: '/library' },
    { name: 'একাডেমিক ক্যালেন্ডার', href: '/calendar' },
    { name: 'ফলাফল ও মূল্যায়ন', href: '/news' },
    { name: 'ক্যারিয়ার', href: '/career' },
  ];

  return (
    <footer className="w-full bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-400 border-t border-slate-800/80">
      {/* Main Footer Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white shadow-md">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                ধর্মপুর মডেল একাডেমি
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed font-normal">
              নৈতিক মূল্যবোধ, আনন্দময় পরিবেশ ও আধুনিক প্রযুক্তির সমন্বয়ে শিশুর
              সুপ্ত প্রতিভার বিকাশ ও উজ্জ্বল ভবিষ্যৎ গড়ায় নিবেদিত।
            </p>

            <div className="flex gap-2.5 pt-2">
              <Link
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white hover:border-transparent transition-all"
              >
                <Facebook className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white hover:border-transparent transition-all"
              >
                <Twitter className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-pink-600 hover:text-white hover:border-transparent transition-all"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                aria-label="Youtube"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-rose-600 hover:text-white hover:border-transparent transition-all"
              >
                <Youtube className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-base font-bold mb-4">
              প্রয়োজনীয় লিংক
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white text-base font-bold mb-4">
              রিসোর্স ও পোর্টাল
            </h4>
            <ul className="space-y-2.5">
              {resources.map((resource, index) => (
                <li key={index}>
                  <Link
                    href={resource.href}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {resource.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-base font-bold mb-4">
              যোগাযোগের ঠিকানা
            </h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <MapPin className="w-4.5 h-4.5 mt-0.5 shrink-0 text-sky-400" />
                <span className="text-sm text-slate-300 leading-snug">
                  ধর্মপুর, কাজলা, গোবিন্দগঞ্জ,
                  <br />
                  গাইবান্ধা, বাংলাদেশ
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4.5 h-4.5 shrink-0 text-sky-400" />
                <span className="text-sm text-slate-300">
                  +880 01917-692136
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4.5 h-4.5 shrink-0 text-sky-400" />
                <span className="text-sm text-slate-300">
                  office@dhormopur.edu.bd
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/80">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <p>
              © {new Date().getFullYear()} ধরমপুর মডেল একাডেমি। সর্বস্বত্ব
              সংরক্ষিত।
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="hover:text-blue-400 transition-colors"
              >
                গোপনীয়তা নীতি
              </Link>
              <Link
                href="/terms"
                className="hover:text-blue-400 transition-colors"
              >
                ব্যবহারের শর্তাবলী
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
