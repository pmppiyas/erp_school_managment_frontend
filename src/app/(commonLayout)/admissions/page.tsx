import { Metadata } from 'next';
import AdmissionHero from '@/app/components/admissions/AdmissionHero';
import AdmissionSteps from '@/app/components/admissions/AdmissionSteps';
import AdmissionEligibility from '@/app/components/admissions/AdmissionEligibility';
import AdmissionFees from '@/app/components/admissions/AdmissionFees';
import RequiredDocuments from '@/app/components/admissions/RequiredDocuments';
import AdmissionOnlineForm from '@/app/components/admissions/AdmissionOnlineForm';
import AdmissionFAQ from '@/app/components/admissions/AdmissionFAQ';
import AdmissionHelpCTA from '@/app/components/admissions/AdmissionHelpCTA';

export const metadata: Metadata = {
  title: 'ভর্তি তথ্য ২০২৬ | ধর্মপুর মডেল একাডেমি',
  description:
    'ধর্মপুর মডেল একাডেমিতে ২০২৬ শিক্ষাবর্ষে প্লে থেকে ১০ম শ্রেণি পর্যন্ত ভর্তি তথ্য, শ্রেণিভিত্তিক বয়স ও আসন বিবরণী, ফি কাঠামো, প্রয়োজনীয় কাগজপত্র এবং ঘরে বসে অনলাইন ভর্তি আবেদন করুন।',
};

export default function AdmissionsPage() {
  return (
    <main className="w-full min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* 1. Hero with Breadcrumb, Highlights & CTA */}
      <AdmissionHero />

      {/* 2. 4-Step Admission Process */}
      <AdmissionSteps />

      {/* 3. Class-wise Age, Seats & Eligibility Criteria */}
      <AdmissionEligibility />

      {/* 4. Transparent Fees & Tuition Structure */}
      <AdmissionFees />

      {/* 5. Required Documents Checklist */}
      <RequiredDocuments />

      {/* 6. Interactive Online Admission Application Form */}
      <AdmissionOnlineForm />

      {/* 7. Frequently Asked Questions (FAQ) */}
      <AdmissionFAQ />

      {/* 8. Help Center & Campus Visit CTA */}
      <AdmissionHelpCTA />
    </main>
  );
}
