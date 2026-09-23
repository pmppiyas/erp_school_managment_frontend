'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { IStudent } from '@/types/student.interface';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Printer, ArrowLeft, CheckCircle2, Award } from 'lucide-react';
import EmptyComp from '@/app/components/shared/EmptyComp';
import TestimonialCard from '@/app/components/shared/template/TestimonialCard';

const TestimonialGenerate = ({
  students,
  year,
}: {
  students: IStudent[];
  year?: string;
}) => {
  const searchParams = useSearchParams();
  const currentYear = new Date().getFullYear();
  const selectedYear = Number(year || searchParams.get('year') || currentYear);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showCards, setShowCards] = useState(false);

  const toggleAll = () => {
    if (selectedIds.length === students.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(students.map((s) => s.id));
    }
  };

  const toggleStudent = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectedStudents = students.filter((s) => selectedIds.includes(s.id));

  const handlePrint = () => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        @page { size: A4 landscape; margin: 0; }
        body { margin: 0; padding: 0 !important; }
        .no-print { display: none !important; }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      window.print();
      document.head.removeChild(style);
    }, 100);
  };

  if (showCards && selectedStudents.length > 0) {
    return (
      <div className="bg-background min-h-screen print:bg-white print:p-0">
        {/* Header - Hidden when printing */}
        <div className="no-print max-w-7xl mx-auto mb-6 p-4 flex justify-between items-center bg-background border-b shadow-sm sticky top-0 z-50">
          <Button variant="outline" onClick={() => setShowCards(false)}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <Button onClick={handlePrint} className="bg-primary">
            <Printer className="w-4 h-4 mr-2" /> Print All
          </Button>
        </div>

        {/* Print Content Area - Crucial Fix here */}
        <div className="print:block flex flex-col items-center gap-8">
          {selectedStudents.map((student) => (
            <div
              key={student.id}
              className="print:m-0 print:p-0 print:block print:break-after-page"
            >
              <TestimonialCard student={student} year={selectedYear} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {students?.length > 0 ? (
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
          {/* Action Bar */}
          <div className="p-4 border-b bg-muted/30">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="select-all"
                    checked={
                      selectedIds.length === students.length &&
                      students.length > 0
                    }
                    onCheckedChange={toggleAll}
                  />
                  <label
                    htmlFor="select-all"
                    className="text-sm font-semibold cursor-pointer select-none"
                  >
                    সবাইকে নির্বাচন করুন
                  </label>
                </div>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-bold">
                  {selectedIds.length} জন নির্বাচিত
                </span>
              </div>

              <Button
                disabled={selectedIds.length === 0}
                onClick={() => setShowCards(true)}
                size="sm"
                className="gap-2 w-full sm:w-auto"
              >
                <Award className="w-4 h-4" />
                সনদপত্র তৈরি করুন
              </Button>
            </div>
          </div>

          {/* Student Grid */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {students.map((student) => {
              const isSelected = selectedIds.includes(student.id);
              return (
                <div
                  key={student.id}
                  onClick={() => toggleStudent(student.id)}
                  className={`group relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border bg-background'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="font-bold text-sm leading-tight">
                        {student.firstName} {student.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">
                        রোল: {student.roll}
                      </p>
                    </div>
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-muted-foreground/30" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <EmptyComp subject="student" />
      )}
    </div>
  );
};

export default TestimonialGenerate;
